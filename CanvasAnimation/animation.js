
var $canvas = document.getElementById('animation');
var ctx = $canvas.getContext('webgl');

function renderFrame() {
  var t = 0;
  return function _renderFrame() {
    // draw each frame here using 
    // t (time) to position flags

    t = (t + 1) % 360;
  }
}

setInterval(renderFrame(), 50);

