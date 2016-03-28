
var express = require('express');
var router = module.exports = express.Router();

router.use('/rosterJSP', function(req, res, next) {
  res.redirect('http://127.0.0.1:8080/WebRoster/roster.jsp');
});

router.use(express.static(__dirname));




