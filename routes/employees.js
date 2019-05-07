var express = require("express");
const sequelize = require("../services/sequelize");
const Sequelize = require("sequelize");
var router = express.Router();

// GET /api/employees/check/:full_name

// Pass full_name to see if Employee is a manager or not

router.get("/check/:full_name", (req, res, next) => {
  const fullName = req.params.full_name;

  var splitName = fullName.split(" ");

  var authPack = {
    id: 0,
    manager: false
  };

  sequelize.Employees.findAll({
    where: {
      first_name: splitName[0],
      last_name: splitName[1]
    },
    include: {
      model: sequelize.DeptManager
    },
    attributes: ["emp_no"]
  })
    .then(emp => {
      authPack.id = emp[0].emp_no;

      if (emp[0].dept_managers.length) {
        authPack.manager = true;
        return res.status(200).json(authPack);
      } else {
        return res.status(200).json(authPack);
      }
    })
    .catch(employeeErr => {
      return res.status(404).json(employeeErr);
    }); // end Employees findAll
});

// GET /api/employees/search?...

// Query String Paramaters:
// query --- Search term, either full employee ID, or first or last name
// dept  --- Department number to filter by
// start --- Search result item to start at
// end   --- Search result item to end at

router.get("/search", (req, res, next) => {
  const query = req.query.query || ".";
  const dept = req.query.dept || ".";
  const pageStart = parseInt(req.query.start) || 0;
  const pageEnd = parseInt(req.query.end) || 20;

  console.log("name: " + req.query.query);
  console.log("dept: " + req.query.dept);

  sequelize.Employees.findAll({
    where: {
      [Sequelize.Op.or]: {
        first_name: { [Sequelize.Op.regexp]: query },
        last_name: { [Sequelize.Op.regexp]: query },
        emp_no: query
      }
    },
    include: [
      {
        model: sequelize.DeptEmployee,
        where: {
          dept_no: { [Sequelize.Op.regexp]: dept },
          to_date: new Date("9999-01-01")
        },
        attributes: ["dept_no"]
      }
    ],
    attributes: ["emp_no", "first_name", "last_name"],
    offset: pageStart,
    limit: pageEnd
  })
    .then(results => {
      finalResults = results.map(elem => {
        var deptFullName = "";
        var deptNumber = elem.dept_emps[0].dept_no;

        switch (deptNumber) {
          case "d001":
            deptFullName = "Marketing";
            break;
          case "d002":
            deptFullName = "Finance";
            break;
          case "d003":
            deptFullName = "Human Resources";
            break;
          case "d004":
            deptFullName = "Production";
            break;
          case "d005":
            deptFullName = "Development";
            break;
          case "d006":
            deptFullName = "Quality Management";
            break;
          case "d007":
            deptFullName = "Sales";
            break;
          case "d008":
            deptFullName = "Research";
            break;
          case "d009":
            deptFullName = "Customer Service";
            break;
          default:
            deptFullName = "Unknown";
        }

        newItem = {
          name: elem.first_name + " " + elem.last_name,
          id: elem.emp_no,
          dept: deptNumber,
          deptName: deptFullName
        };

        return newItem;
      });

      return res.status(200).send(finalResults);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

router.get("/:emp_no", async function(req, res, next) {
  const employeeNo = req.params.emp_no;

  sequelize.Employees.findByPk(employeeNo, {
    include: [
      {
        model: sequelize.Salaries,
        where: { emp_no: Sequelize.col("employees.emp_no") },
        attributes: ["salary", "from_date", "to_date"]
      },
      {
        model: sequelize.Titles,
        where: { emp_no: Sequelize.col("employees.emp_no") },
        attributes: ["title", "from_date", "to_date"]
      },
      {
        model: sequelize.DeptEmployee,
        where: { emp_no: Sequelize.col("employees.emp_no") },
        attributes: ["dept_no"],
        include: [
          {
            model: sequelize.Departments
          }
        ]
      }
    ]
  })
    .then(async empInfo => {
      var currentSalary;
      var currentTitle;
      var salaryCopy;
      var titlesCopy;

      async function alterFields() {
        currentSalary = empInfo.salaries[empInfo.salaries.length - 1].salary;
        currentTitle = empInfo.titles[0].title;
        currentDepartment =
          empInfo.dept_emps[empInfo.dept_emps.length - 1].department.dept_name;
        currentDepartmentId =
          empInfo.dept_emps[empInfo.dept_emps.length - 1].dept_no;
        salaryCopy = empInfo.salaries;
        titlesCopy = empInfo.titles;
        salaryCopy[salaryCopy.length - 1].to_date = null;
        titlesCopy[0].to_date = null;
      }

      await alterFields();

      employeeDetails = {
        emp_no: empInfo.emp_no,
        birth_date: empInfo.birth_date,
        first_name: empInfo.first_name,
        last_name: empInfo.last_name,
        gender: empInfo.gender,
        hire_date: empInfo.hire_date,
        curr_salary: currentSalary,
        curr_title: currentTitle,
        curr_dept: currentDepartment,
        curr_dept_id: currentDepartmentId,
        salaries: salaryCopy,
        titles: titlesCopy
      };

      return res.status(200).json(employeeDetails);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
});

module.exports = router;
