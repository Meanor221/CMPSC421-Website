
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = module.exports = express.Router();

var answerKey = 'AAAAAAAAAA'.split('');

app.get('/question/:id', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'question-'+req.param.id+'.html'));
});

app.post('/submit', function(req, res, next) {
  var score = req.body.answers
    .map(function(x,i) {return x === answerKey[i];})
    .reduce(function(score, correct) {
      return correct ? (score + 1) : score;
    });
  fs.readFile('submit.html', 'utf8', function (error, data) {
		if (error) return next(error);
	  res.send(data.replace('$SCORE$', score));
	});	
});

