
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = module.exports = express.Router();

var answerKey = 'AAAAAAAAAA'.split('');

router.get('/question/:id', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'question-'+req.param.id+'.html'));
});

var tScore = 0;

router.post('/submit', function(req, res, next) {
  var score = req.body.answers
    .map(function(x,i) {return x === answerKey[i];})
    .reduce(function(score, correct) {
      return correct ? (score + 1) : score;
    });
  fs.readFile('submit.html', 'utf8', function (error, data) {
		if (error) return next(error);
    tScore = score;
	  res.send(data.replace('$SCORE$', score));
	});	
});

var nodemailer = require('nodemailer');
var emailTransport = nodemailer.createTransport();

router.post('/email', function(req, res, next) {
  var form = {
    fromName: req.body.fname,
    fromEmail: req.body.femail,
    toName: req.body.tname,
    toEmail: req.body.temail,
    subject: req.body.subject, 
  };
  var message = {
    from: [form.fromName, ' <', form.fromEmail, '>'].join(''),
    to: [form.toName, ' <', form.toEmail, '>'].join(''),
    subject: form.subject,
    text: [form.formName, ' scored ', tScore, '/', answerKey.length].join(''),
  };
  emailTransport.sendMail(message, function(error) {
    if(error) return next(error);
    res.sendFile('email-sent.html');
  });
});

