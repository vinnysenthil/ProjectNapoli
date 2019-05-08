const RuntimeVars = require('../services/RuntimeVars');
const sequelize = require('../services/sequelize');
const Sequelize = require('sequelize');
var express = require('express');
const moment = require('moment');
var router = express.Router();

router.get('/:dept_no', (req, res, next) => {
    const deptID = req.params.dept_no;
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
                        male: numMales / total,
                        female: numFemales / total ,
                        avgMaleSalary: totalMaleSalary / numMales,
                        avgFemaleSalary: totalFemaleSalary / numFemales,
                        shareOfCompanyCost: (((totalMaleSalary/total) + (totalFemaleSalary/total)) * total) / 19106910329,
                        totalEmployees: total 
                    });

                }).catch((err) => { return res.status(404).json(err) });
                
            }).catch((err) => { return res.status(404).json(err) });

        }).catch((err) => { return res.status(404).json(err) });

    }).catch((err) => { return res.status(404).json(err) });
    
    

});

module.exports = router;