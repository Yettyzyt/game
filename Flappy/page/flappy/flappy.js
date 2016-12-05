'use strict';

/**
 * @author Yetty
 * @date 2016-12-1
 * @desc flappy bird
 */

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
// 分数
var score = 0;
// 水管起始位置
var x = canvas.width;
// 小鸟宽高及位置
var birdWidth = 30;
var birdHeight = 30;
var birdX = 100;
var birdY = (canvas.height - birdHeight)/2;
// 水管移动速度及小鸟下降速度
var dx = -1;
var dy = 1.5;
// 水管宽度、间距及上下水管空隙
var pipeWidth = 30;
var pipePadding = 150;
var pipeSpace = 120;
// 屏幕内水管数量
var pipeNum = 0;
// 水管参数数组
var pipes = [];
// 键盘控制
var spacePressed = false;
// 键盘事件监听
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// 键盘事件处理
function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = false;
    }
}
// 绘制分数
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
// 绘制小鸟
function drawBird() {
	ctx.beginPath();
	ctx.rect(birdX, birdY, birdWidth, birdHeight);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.closePath();
}
// 绘制水管
function drawPipe() {	
	for (var n = 0; n <= pipeNum; n++) {
		var h = pipes[n],
			startX = x + (pipeWidth + pipePadding) * n;
		ctx.beginPath();
		ctx.rect(startX, 0, pipeWidth, h);
		ctx.rect(startX, pipeSpace + h, pipeWidth, canvas.height - h - pipeSpace);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.closePath();
	};
}
// 生成水管参数
function creatPipeParam() {
	//此处计算写死，需调整
	var pipeHeight = Math.ceil(Math.random()*9)*20;
	pipes.push(pipeHeight);
	pipeNum ++;
}
// 销毁水管参数
function deatoryPipeParam() {
	pipes.shift();
	pipeNum --;
}
// 绘制
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawBird();
	drawPipe();
	drawScore();
	if ( (canvas.width - x) % (pipePadding + pipeWidth) == 0) {
		creatPipeParam();
	}
	if ( x < -pipeWidth ) {
		deatoryPipeParam();
		x = pipePadding;
	}
	// 键盘控制   
	if ( spacePressed ) {
        birdY -= 7;
    }
    // 碰撞检测
    if ( birdY >= canvas.height - birdHeight ) {
    	alert('GAME OVER1');
        document.location.reload();
    }
    if ( birdY <= 0 ) {
    	birdY = 0;
    };
    if ( (x < birdX + birdWidth) && x > ( birdX - pipeWidth ) ) {
    	if ( birdY < pipes[0] || birdY + birdHeight > pipeSpace + pipes[0] ) {  
    		alert('GAME OVER2');
        	document.location.reload();
    	}
    }
    if ( x + pipeWidth == birdX ) {
    	score++;
    }
	x += dx;
	birdY += dy;
	requestAnimationFrame(draw);
}
draw();


	
	