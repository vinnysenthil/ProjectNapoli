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
        }]

    }).then((empInfo) => {
        return res.status(200).json(empInfo);
    }).catch((err) => {
        return res.status(404).json(err);
    });


  });

  module.exports = router;