var express = require('express');
const sequelize = require('../services/sequelize');
var router = express.Router();
var cors = require('cors');

// Test endpoint
router.get('/', function(req, res, next) {
  res.status(200).json({ success: true, message: 'test' });
});

// Test DB endpoint
router.get('/depts', async function(req, res, next) {
  var allDepts = await sequelize.Departments.findAll()
  res.status(200).send(allDepts);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
router.get('/messages', (req, res) => {
  res.json({
    messages: [
      {
        date:  new Date(),
        text: 'I am a robot.'
      },
      {
        date:  new Date(new Date().getTime() - 1000 * 60 * 60),
        text: 'Hello, world!'
      }
    ]
  });
});


// Load other routes
router.use('/employees', require('./employees'));
router.use('/salaries', require('./salaries'));

module.exports = router;