const RuntimeVars = require('../services/RuntimeVars');
const sequelize = require('../services/sequelize');
const Sequelize = require('sequelize');
var express = require('express');
const moment = require('moment');
var router = express.Router();

router.get('/:dept_no', (req, res, next) => {

    const deptID = req.params.dept_no;
    var deptFullName = " ";

    switch (deptID) {
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

    sequelize.Employees.count({
        where: {gender: 'M'},
        include: 
        [{
            model: sequelize.DeptEmployee,
            where: { 
                emp_no: Sequelize.col('employees.emp_no'),
                dept_no: deptID
         },
        }]
    }).then((numMales) => {
        sequelize.Employees.count({
            where: {gender: 'F'},
            include: 
            [{
                model: sequelize.DeptEmployee,
                where: { 
                    emp_no: Sequelize.col('employees.emp_no'),
                    dept_no: deptID
             },
            }]
        }).then((numFemales) => {
            const total = numMales + numFemales;
            console.log(moment().add(1000, 'years').toDate())
            sequelize.Salaries.sum('salary', {
                where: {to_date: { [Sequelize.Op.gte]: moment().add(1, 'years').toDate()} },
                include: 
                [{
                    model: sequelize.DeptEmployee,
                    where: { 
                        emp_no: Sequelize.col('salaries.emp_no'),
                        dept_no: deptID
                    },
                },
                {
                    model: sequelize.Employees,
                    where: {
                        emp_no: Sequelize.col('salaries.emp_no'),
                        gender: 'M'
                    }  
                }]
            }).then((totalMaleSalary) => {
                sequelize.Salaries.sum('salary', {
                    where: {to_date: { [Sequelize.Op.gte]: moment().add(1, 'years').toDate()} },
                    include: 
                    [{
                        model: sequelize.DeptEmployee,
                        where: { 
                            emp_no: Sequelize.col('salaries.emp_no'),
                            dept_no: deptID
                        },
                    },
                    {
                        model: sequelize.Employees,
                        where: {
                            emp_no: Sequelize.col('salaries.emp_no'),
                            gender: 'F'
                        }  
                    }]
                }).then((totalFemaleSalary) => {

                    return res.status(200).json({
                        male: Math.round(100 * (numMales / total)) / 100,
                        female: Math.round(100 * (numFemales / total)) / 100,
                        avgMaleSalary: Math.round(100 * (totalMaleSalary / numMales)) / 100,
                        avgFemaleSalary: Math.round(100 * (totalFemaleSalary / numFemales)) / 100,
                        shareOfCompanyCost: Math.round(100 * ((((totalMaleSalary/total) + (totalFemaleSalary/total)) * total) / 19106910329)) / 100,
                        totalEmployees: total,
                        deptName: deptFullName
                    });

                }).catch((err) => { return res.status(404).json(err) });
                
            }).catch((err) => { return res.status(404).json(err) });

        }).catch((err) => { return res.status(404).json(err) });

    }).catch((err) => { return res.status(404).json(err) });
    
    

});

module.exports = router;