function renderTime()
{
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

window.onload = function(){
	var $clock = document.getElementById("clock");
	setInterval(function(){$clock.innerHTML=renderTime()}, 1000);
	console.log(navigator.appName, navigator.appVersion);
}
