
var fs = require('fs');
var path = require('path');
var express = require('express');
var router = module.exports = express.Router();

var answerKey = 'BADABDBABA'.split('');
var clientKey = '          '.split('');

router.get('/', function(req, res, next) {
  res.redirect('questions/1');
});

router.get('/questions/:id', function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  var answer = clientKey[id-1];
  fs.readFile(path.join(__dirname, 'Q'+id+'.html'), 'utf8', function(error, data) {
    if(error) return next(error);
    var html = data
      .replace("value='"+answer+"'", "value='"+answer+"' checked")
      .replace('value="'+answer+'"', 'value="'+answer+'" checked');
    res.send(html);
  });
});

router.post('/questions/:id', function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  clientKey[id-1] = req.body.ans;
  var toPrevious = req.body.direction.charAt(0).toLowerCase() === 'p';
  var nextId = id + (toPrevious ? -1 : 1);
  if(nextId > 10) return res.redirect('/EvalTool/submit');
  res.redirect('/EvalTool/questions/'+nextId);
});

var tScore = 0;

router.get('/submit', function(req, res, next) {
  var score = clientKey
    .map(function(x,i) {return x === answerKey[i];})
    .reduce(function(score, correct) {
      return correct ? (score + 1) : score;
    });
  tScore = score;
  clientKey = '          '.split('');
  fs.readFile(path.join(__dirname, 'submit.html'), 'utf8', function(error, data) {
		if (error) return next(error);
	  res.send(data.replace('$SCORE$', score));
	});	
});

var nodemailer = require('nodemailer');
var emailTransport = nodemailer.createTransport();

router.post('/submit', function(req, res, next) {
  var form = {
    fromName: req.body.fname,
    fromEmail: req.body.femail,
    toName: req.body.tname,
    toEmail: req.body.temail,
    subject: req.body.subject, 
  };
  var messages = emails(form);
  var dev = false;
  (dev ? mockEmail : email)(messages[0], messages[1], function(error) {
    if(error) return next(error);
    tScore = null;
    res.sendFile(path.join(__dirname, 'submitted.html'));
  });
});

function emails(form) {
  var teacherMessage = {
    from: [form.fromName, ' <', form.fromEmail, '>'].join(''),
    to: form.toEmail,
    subject: form.subject,
    text: [form.fromName, ' scored ', tScore, '/', answerKey.length].join(''),
  };
  var studentMessage = {
    from: form.fromEmail,
    to: form.fromEmail,
    subject: 'Your evaluation score',
    text: [form.fromName, ' scored ', tScore, '/', answerKey.length].join(''),
  };
  return [teacherMessage, studentMessage];
}

function email(msg1, msg2, next) {
  emailTransport.sendMail(msg1, function(error) {
    if(error) return next(error);
    emailTransport.sendMail(msg2, function(error) {
      if(error) return next(error);
      next(null);
    });
  });
} 

function mockEmail(msg1, msg2, next) {
  console.log(msg1);
  console.log(msg2);
  next(null);
}

