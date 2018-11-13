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
	};

	let render = function() {
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0, width, height);
		player.render();
	}


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
	}
/*
	function Computer() {
		this.paddle = new Paddle(750, 750, 225, 275);
	}
*/

Player.prototype.render = function() {
	this.paddle.render()
}

/*
Computer.protypte.render = function(){
  this.paddle.render();
}
*/

//Paddle Controls
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
