var express = require('express');
const sequelize = require('../services/sequelize');
var router = express.Router();

// Test endpoint
router.get('/', function(req, res, next) {
  res.status(200).json({ success: true, message: 'test' });
});

// Test DB endpoint
router.get('/depts', async function(req, res, next) {
  var allDepts = await sequelize.Departments.findAll()
  res.status(200).send(allDepts);
});

module.exports = router;