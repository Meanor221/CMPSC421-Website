
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

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Evaluation Feedback</title>
</head>
<div id="Contact">
<body>
    <h1>Evaluation Feedback</h1>
    <form action="http://127.0.0.1:8080/sendmail" method="post">
        
            <label for="name">From Name:</label>
            <input type="text" id="fname" name="fname" placeholder="Enter your full name" />
			<br>
            <label for="email">From Email:</label>
            <input type="email" id="femail" name = "femail" placeholder="Enter your email address" />
			<br><hr>
            <label for="name">To Name:</label>
            <input type="text" id="tname" name="tname" placeholder="Enter recipients full name" />
			<br>
            <label for="email">To Email:</label>
            <input type="email" id="temail" name = "temail" placeholder="Enter recipients email address" />
			<br>
            <label for="subject">Subject:</label>
            <input type="text" id="subject" name = "subject" placeholder="Enter subject" />
			<br><hr>
	    <label for="score">Your final score: </label>
			<br>
            <input type="submit" value="Send Emails" />
        
    </form>
</div>
</body>
</html>
