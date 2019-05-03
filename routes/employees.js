var express = require('express');
const sequelize = require('../services/sequelize');
const Sequelize = require('sequelize');
var router = express.Router();


router.get('/:emp_no', async function(req, res, next) {

    const employeeNo = parseInt(req.params.emp_no);

    sequelize.Employees.findByPk(employeeNo, {
        include: [{ 
            model: sequelize.Salaries,
            where: { emp_no: Sequelize.col('employees.emp_no') },
            attributes: ['salary', 'from_date', 'to_date']
        },
        {
            model: sequelize.Titles,
            where: { emp_no: Sequelize.col('employees.emp_no') },
            attributes: ['title', 'from_date', 'to_date']
        },
        {
            model: sequelize.DeptEmployee,
            where: { emp_no: Sequelize.col('employees.emp_no') },
            attributes: ['dept_no'],
            include: [{
                model: sequelize.Departments
            }]
        }
    ]

    }).then(async (empInfo) => {

        var currentSalary
        var currentTitle
        var salaryCopy
        var titlesCopy

            async function alterFields() {
                currentSalary = empInfo.salaries[empInfo.salaries.length - 1].salary
                currentTitle = empInfo.titles[0].title
                currentDepartment = empInfo.dept_emps[empInfo.dept_emps.length - 1].department.dept_name
                currentDepartmentId = empInfo.dept_emps[empInfo.dept_emps.length - 1].dept_no
                salaryCopy = empInfo.salaries
                titlesCopy = empInfo.titles
                salaryCopy[salaryCopy.length - 1].to_date = null
                titlesCopy[0].to_date = null
            }
            
            await alterFields()

            employeeDetails = {
            
                emp_no: empInfo.emp_no,
                birth_date: empInfo.birth_date,
                first_name: empInfo.first_name,
                lastName: empInfo.last_name,
                gender: empInfo.gender,
                hide_date: empInfo.hide_date,
                curr_salary: currentSalary,
                curr_title: currentTitle,
                curr_dept: currentDepartment,
                curr_dept_id: currentDepartmentId,
                salaries: salaryCopy,
                titles: titlesCopy
    
            }
    
            return res.status(200).json(employeeDetails);
        }).catch((err) => {
        return res.status(404).json(err);
    });
    
});

  module.exports = router;