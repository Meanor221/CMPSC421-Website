//new version


function drawFlags() {
   
    var canvas = document.getElementById("flag");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    
   
    for (var i = 0; i < flags.length; i++) {
        flags[i].draw(canvas.getContext('2d'));
        flags[i].rotation = (flags[i].rotation + degrees) % 360;
    }
        
  
    flags.sort(function(a, b) { return (a.y - a.yOffset) - (b.y - b.yOffset)});  
    request = requestAnimationFrame(drawFlags);
}
function makeFlags(rows, flagsPerRow, degrees, maxSR, minSR) {
    console.log(rows);
    console.log(flagsPerRow);
    console.log(degrees);
  
    if (request)
        cancelAnimationFrame(request);
            
   
    this.degrees = degrees;
    
   
    flags = [];
        

    for (var i = 0; i < flagsPerRow; ++i)
            for (var j = 0; j < rows; ++j)
                flags.push(new Flag(
                    imgs[Math.round(Math.random() * (imgs.length - 1))], 
                    j*100, 
                    document.getElementById("flag").width - 300,
                    200 + j * 58,
                    i * (360/flagsPerRow), 
                    minSR + Math.floor(Math.random()*(maxSR - minSR))
                ));
    
    
    request = requestAnimationFrame(drawFlags);
}
function Flag(image, yOffset, maxWidth, maxHeight, startRotation, rotationAmount, scaleFactor) {
    this.image = image;
    this.rotation = startRotation % 360 || 0;
    this.maxWidth = maxWidth || image.width;
    this.maxHeight = maxHeight || image.height;
    this.scaleFactor = scaleFactor || 0.5;
    this.rotationAmount = rotationAmount || 2
    this.yOffset = yOffset;
    this.canvas = document.createElement('canvas');
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.y = 0;
    
    
    this.draw = function(drawingContext) {
        var context = this.canvas.getContext('2d');
                
        
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        
        var angle = (this.rotation * this.rotationAmount) % 360;
        var flipw = this.image.width * Math.cos(angle * Math.PI / 180);
        var flipx = this.image.width / 2 - flipw / 2;
        if (angle >= 90 && angle < 270) {
            context.resetTransform();
            context.translate(this.image.width, 0);
            context.scale(-1, 1);
        }
        else
            context.resetTransform();
        var scale = 1 - (Math.cos((this.rotation - 180) * Math.PI / 180) * (1 - this.scaleFactor) / 2 + (1 - this.scaleFactor) / 2);
        var w = flipw * scale;
        var h = this.image.height * scale;
        var x = flipx - (w - flipw) / 2;
        var y = -(this.image.height - this.canvas.height) / 2;
        
        
        context.drawImage(this.image, x, 0, w, h);
        context.fillStyle = "rgba(0, 0, 0, " + (-scale + 1) + ")";
        context.fillRect(x, y, w, h)
        x = Math.sin(this.rotation * Math.PI / 180) * this.maxWidth / 2 + this.maxWidth / 2;
        this.y = this.yOffset  + Math.cos(this.rotation * Math.PI / 180) * this.maxHeight / 2 + this.maxHeight / 2;
        
       
        drawingContext.drawImage(this.canvas, x, this.y);
    }
}


var imgs = [];
var flags = [];
var flagNames = [ "usa", "uk" ];
var readyImgs = flagNames.length;
var request;

addEventListener("load", function() {
   
    document.getElementById("flag").width = document.body.clientWidth;
    document.getElementById("flag").height = document.body.clientWidth;
    
   
    for (var i = 0; i < flagNames.length; ++i) {
       
        imgs[i] = new Image();
        imgs[i].src = "/CanvasAnimation/" + flagNames[i] + "_flag.png";
        imgs[i].onload = function() {
            if (--readyImgs == 0) {
                makeFlags(2, 12, 0.5, 5, 1);
            }
        }
    }
});





