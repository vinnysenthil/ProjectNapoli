var express = require('express');
const sequelize = require('../services/sequelize');
const Sequelize = require('sequelize');
var router = express.Router();

// This endpoint DOES NOT WORK YET
router.get('/:dept_no', (req, res) => {
    const deptNo = req.params.dept_no;
    var deptInfoPack = { }


    sequelize.DeptEmployee.findAll({
        where: { 
            dept_no: deptNo, 
            // to_date: "9999-01-01" 
        },
        include: [{
            model: sequelize.Employees,
            where: { emp_no: Sequelize.col('dept_emps.emp_no') },
            attributes: ['hire_date', 'gender', 'birth_date'],
            include: [
                
            ]
        },
        {
            model: sequelize.Salaries,
            where: { 
                emp_no: Sequelize.col('dept_emps.emp_no'),
                to_date: "9999-01-01"
             },
            attributes: ['salary']
        }],

    }).then((allInfo) => {
        return res.status(200).send(allInfo)
    }).catch((err) => {
        return res.status(404).json(err)
    });

}); // end GET /:dept_no

module.exports = router;