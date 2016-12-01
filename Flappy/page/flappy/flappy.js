'use strict';

/**
 * @author Yetty
 * @date 2016-12-1
 * @desc flappy bird
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

var birdWidth = 30;
var birdHeight = 30;

var x = canvas.width;
var y = (canvas.height - birdHeight)/2;

var dx = -0.5;

var pipeWidth = 30;
var pipePadding = 70;
var pipeSpace = 100;

var pipeNum = Math.floor((canvas.width - x - pipePadding)/(pipeWidth + pipePadding));

// var pipes = [];
// for (var i = 0; i < pipeNum; i++) {
// 	pipes[c] = [];
// 	for(var r=0; r<brickRowCount; r++) {
//         bricks[c][r] = { x: 0, y: 0 };
//     }
// };
// 绘制小鸟
function drawBird() {
	ctx.beginPath();
	ctx.rect(100, y, birdWidth, birdHeight);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.closePath();
}
// 绘制一个水管
function drawPipe(h) {		
	ctx.beginPath();
	ctx.rect(x, 0, pipeWidth, h);
	ctx.rect(x, pipeSpace + h, pipeWidth, canvas.height - h - pipeSpace);
	ctx.fillStyle = 'green';
	ctx.fill();
	ctx.closePath();
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBird();
	drawPipe(120);
	if ( x < -pipeWidth ) {
		x = canvas.width;
	}
	x += dx;
	console.log(x);
	requestAnimationFrame(draw);
}
draw();


	//写死，需调整
	var pipeHeight = Math.floor((Math.random()*9)+1)*20;
