
var express = require('express');
var router = module.exports = express.Router();

var scheduleJson = require('./schedule.js');

router.get('/schedule.json', function(req, res, next) {
  res.json(scheduleJson);
});

router.use(express.static(__dirname));

