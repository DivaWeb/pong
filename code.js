let animate = window.requestAnimationFrame || function(callback){
	window.setTimeout(callback, 1000/60) };

	const canvas = document.getElementById("myCanvas");
	const width = 400;
	const height = 600;
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d")
	const player = new Player();
	let keysDown = {};
	const computer = new Computer();
	const ball = new Ball(200, 300);


	window.onload = function() {
		document.body.appendChild(canvas);
		animate(step);
	};

	let step = function(){
		update();
		render();
		animate(step);
	}

	let update = function() {
    player.update();
		ball.update(player.paddle, computer.paddle);
		computer.update(ball);
	};

	let render = function() {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0, width, height);
		player.render();
		ball.render();
		computer.render();
	};


	//center line
	function drawCenterLine() {
	ctx.beginPath();
	ctx.moveTo(400, 2);
	ctx.lineTo(400, 498);
	ctx.lineWidth = 1;
	ctx.strokeStyle = "gray";
	ctx.stroke();
	}

	function Paddle(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
    this.x_speed = 0;
		this.y_speed = 0;
	}

	Paddle.prototype.render = function() {
		ctx.fillStyle = "#ffffff"
		ctx.fillRect(this.x, this.y, this.width, this.height);
	};

	function Player() {
		this.paddle = new Paddle(175, 580, 50, 10);
	};

	function Computer() {
		this.paddle = new Paddle(175, 10, 50, 10);
	};


Player.prototype.render = function() {
	this.paddle.render()
};


Computer.prototype.render = function(){
  this.paddle.render();
};

//ball
function Ball(x, y){
	this.x = x;
	this.y = y;
	this.x_speed = 0;
	this.y_speed = 3;
	this.radius = 5;
};

Ball.prototype.render = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0 * Math.PI, 2 * Math.PI)
	ctx.fillStyle = 'white';
	ctx.fill();
};

//Paddle Controls and Ball Controls
window.addEventListener("keydown", function(even){
	keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
	delete keysDown[event.keyCode];
});


Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 37) {
      this.paddle.move(-4, 0);
    } else if (value == 39) {
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};


Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.x < 0) {
    this.x = 0;
    this.x_speed = 0;
  } else if (this.x + this.width > 400) {
    this.x = 400 - this.width;
    this.x_speed = 0;
  }
}

Ball.prototype.update = function() {
	this.x += this.x_speed;
	this.y += this.y_speed;
};

Ball.prototype.update = function(paddle1, paddle2) {
  this.x += this.x_speed;
  this.y += this.y_speed;
  var top_x = this.x - 5;
  var top_y = this.y - 5;
  var bottom_x = this.x + 5;
  var bottom_y = this.y + 5;

  if(this.x - 5 < 0) { // hitting the left wall
    this.x = 5;
    this.x_speed = -this.x_speed;
  } else if(this.x + 5 > 400) { // hitting the right wall
    this.x = 395;
    this.x_speed = -this.x_speed;
  }

  if(this.y < 0 || this.y > 600) { // a point was scored
    this.x_speed = 0;
    this.y_speed = 3;
    this.x = 200;
    this.y = 300;
  }

  if(top_y > 300) {
    if(top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y && top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x) {
      // hit the player's paddle
      this.y_speed = -3;
      this.x_speed += (paddle1.x_speed / 2);
      this.y += this.y_speed;
    }
  } else {
    if(top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y && top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x) {
      // hit the computer's paddle
      this.y_speed = 3;
      this.x_speed += (paddle2.x_speed / 2);
      this.y += this.y_speed;
    }
  }
};

//Artificle Intelgence
Computer.prototype.update = function(ball) {
  var x_pos = ball.x;
  var diff = -((this.paddle.x + (this.paddle.width / 2)) - x_pos);
  if(diff < 0 && diff < -3) { // max speed left
    diff = -5;
  } else if(diff > 0 && diff > 3) { // max speed right
    diff = 5;
  }
  this.paddle.move(diff, 0);
  if(this.paddle.x < 0) {
    this.paddle.x = 0;
  } else if (this.paddle.x + this.paddle.width > 400) {
    this.paddle.x = 400 - this.paddle.width;
  }
};
