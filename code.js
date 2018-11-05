const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height /2;
var radius = 10;
var startAngle = 2 * Math.PI;
var endAngle = 4 * Math.PI;
var counterClockwise = false;


ctx.fillStyle = "black";
ctx.fillRect(0, 0, 800, 500);

//center line
ctx.beginPath();
ctx.moveTo(400, 2);
ctx.lineTo(400, 498);
ctx.lineWidth = 1;
ctx.strokeStyle = "gray";
ctx.stroke();

//paddles
//left hand paddle
ctx.beginPath();
ctx.moveTo(50, 225);
ctx.lineTo(50, 275);
ctx.lineWidth = 15;
ctx.strokeStyle = "white";
ctx.stroke();

//right hand paddle
ctx.beginPath();
ctx.moveTo(750, 225);
ctx.lineTo(750, 275);
ctx.lineWidth = 15;
ctx.strokeStyle = "white";
ctx.stroke();

//ball
ctx.beginPath();
ctx.arc(x, y, radius, startAngle, endAngle, counterClockwise);
ctx.lineWidth = 1;
ctx.fillStyle = "white";
ctx.fill();
ctx.strokeStyle = "white";
ctx.stroke();

//player constructor
function player (){

}

//game constructor
function computer(name){
  this.name = name;
}

function newBall(){

}
