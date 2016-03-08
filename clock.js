function renderTime() {
	var d = new Date();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();
	var xm = hours > 12 ? "pm" : "am";
	var time;
	if(seconds < 10) seconds = "0" + seconds;
	if(minutes < 10)
		time = hours%12 + ":" + "0" + minutes + ":" + seconds + xm;
	else
		time = hours%12 + ":" + minutes + ":" + seconds + xm;
	return time;
}

function updateTime() { // Update the SVG cLock graphic to show current time
  var now = new Date(); // Current time
  var min = now.getMinutes(); // Minutes
  var hour = (now.getHours() % 12) + min/60; // FractionaL hours
  var minangle = min*6; // 6 degrees per minute
  var hourangle = hour*30; // 30 degrees per hour

  // Get 5V6 eLements for the hands of the cLock
  var minhand = document.getElementById("minutehand");
  var hourhand = document.getElementById("hourhand");

  // Set an SVG attribute on them to move them around the cLock face
  minhand.setAttribute("transform", "rotate(" + minangle + ",50,50)");
  hourhand.setAttribute("transform", "rotate(" + hourangle + ",50,50)");

  // Update the cLock again in 1 minute
  console.log('updateTime()');
  setTimeout(updateTime, 60000);
}

var animation = true;

window.onload = function(){
  if(animation) {
    updateTime();
  } else {
    var $clock = document.getElementById("clock");
    setInterval(function(){$clock.innerHTML=renderTime()}, 1000);
    console.log(navigator.appName, navigator.appVersion);
  }
}
