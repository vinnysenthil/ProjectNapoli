var express = require('express');
const sequelize = require('../services/sequelize');
var router = express.Router();


router.get('/:emp_no', async function(req, res, next) {

    sequelize.Employees.findOne({ 
        where: {emp_no: parseInt(req.params.emp_no) },
        attributes: ['birth_date', 'first_name', 'last_name', 'gender', 'hire_date'] 
    }).then((empInfo) => {
        return res.status(200).json(empInfo);
    }).catch((err) => {
        return res.status(404).json(err);
    });


  });

  module.exports = router;