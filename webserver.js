var express = require('express');
var fs = require('fs');
var bodyParser  = require('body-parser');

var ChatServer  = require('./CloudChat/ChatServer');
var syllabus  = require('./Syllabus/syllabus');
var canvasanimation = require('./CanvasAnimation/tool.js');
//setup the root path
var root = __dirname;
ChatServer.gettool.root = root;
syllabus.gettool.root = root;
canvasanimation.gettool.root = root;
var app     = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set("jsonp callback", true);

app.get('/', function (req, res) {
	fs.readFile('home.html', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);	
		}
	res.send(data);
	});	
});
app.get('/about.html', function (req, res) {
	fs.readFile('about.html', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);	
		}
	res.send(data);
	});	
});
app.get('/side.html', function (req, res) {
	fs.readFile('side.html', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);	
		}
	res.send(data);
	});	
});
app.get('/clock.js', function (req, res) {
	fs.readFile('clock.js', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);	
		}
	res.send(data);
	});	
});

app.get('/ThreeRegion/*', threeregion);
function threeregion(req, res) {
	var fileName = root +req.path;
	  res.sendFile(fileName, function (err) {
	    if (err) {
	      console.log(err);
	      res.status(err.status).end();
	    }
	    else {
	      console.log('Sent:', req.path);
	    }
	  });
}

app.get('/CloudChat/*', ChatServer.gettool);
app.get('/Syllabus/*', syllabus.gettool);
app.get("/CanvasAnimation/*", canvasanimation.gettool);
var useJSONP = true;
if(useJSONP) {
  var evalJSONP = require('./EvalJSONP/EvalJSONP');
  evalJSONP.gettool.root = __dirname;
  app.get('/EvalTool/*', evalJSONP.gettool);
  app.post('/EvalTool/*', evalJSONP.posttool);
} else {
  app.use('/EvalTool', require('./EvalTool/'));
}

app.use('/Schedule', require('./Schedule'));
app.use('/CanvasAnimation', require('./CanvasAnimation'));
app.use('/LectureNotes', require('./LectureNotes'));

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

