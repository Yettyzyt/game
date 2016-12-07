'use strict';

/**
 * @author Yetty
 * @date 2016-12-1
 * @desc flappy bird
 */

var flappy = {
	options: {
		birdWidth: 30, //小鸟宽度
		birdHeight: 30, //小鸟高度
		birdX: 100, //小鸟水平位置
		birdUp: 7, //小鸟跳跃幅度
		pipeWidth: 30, //水管宽度
		pipePadding: 130, //两根水管间距
		pipeSpace: 120, //上下 水管间距
		pipeStyle: 5, //水管种类
		dx: -1, //水管移动速度
		dy: 1.5, //小鸟下降速度
		needAcceleration: true //游戏加速，true or false
	},

	init: function() {
		var canvas = document.getElementById('myCanvas'),
			opts = this.options;
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		
		this.pop = document.querySelector('.J_pop');
		this.popText = document.querySelector('.J_popText');
		this.popBtn = document.querySelector('.J_popBtn');

		this.x = this.canvasWidth; //第一根水管的水平位置
		this.birdY = (this.canvasHeight - opts.birdHeight)/2; //小鸟垂直位置：居中	
		this.score = 0;
		this.pipeNum = 0;
		this.pipes = [];
		this.spacePressed = false;
		this.raf = null;
		this.bindEvent();
		this.draw(); 
	},

	reset: function() {
    	cancelAnimationFrame(this.raf);
		var	opts = this.options;
		this.pop.style.display = 'none';
		this.x = this.canvasWidth; //第一根水管的水平位置
		this.birdY = (this.canvasHeight - opts.birdHeight)/2; //小鸟垂直位置：居中	
		this.score = 0;
		this.pipeNum = 0;
		this.pipes = [];
		this.spacePressed = false;
		this.raf = null;
		this.draw();
	},

	drawScore: function() {	
		var	ctx = this.ctx;
	    ctx.font = "16px Arial";
	    ctx.fillStyle = "#0095DD";
	    ctx.fillText("Score: " + this.score, 8, 20);
	},

	drawBird: function() {
		var opts = this.options,
			ctx = this.ctx;
		ctx.beginPath();
		ctx.rect(opts.birdX, this.birdY, opts.birdWidth, opts.birdHeight);
		ctx.fillStyle = 'yellow';
		ctx.fill();
		ctx.closePath();
	},

	drawPipe: function() {	
		var self = this,
			opts = this.options,
			ctx = this.ctx;
		for (var n = 0; n <= this.pipeNum; n++) {
			var h = this.pipes[n],
				x = this.x + (opts.pipeWidth + opts.pipePadding) * n;
			ctx.beginPath();
			ctx.rect(x, 0, opts.pipeWidth, h);
			ctx.rect(x, opts.pipeSpace + h, opts.pipeWidth, self.canvasHeight - h - opts.pipeSpace);
			ctx.fillStyle = 'green';
			ctx.fill();
			ctx.closePath();
		};
	},

	createPipe: function() {
		var opts = this.options,
			pipeUnitHeight = Math.floor((this.canvasHeight - opts.pipeSpace) / (opts.pipeStyle + 2)),
			pipeHeight = Math.ceil(Math.random() * opts.pipeStyle) * pipeUnitHeight;
		this.pipes.push(pipeHeight);
		this.pipeNum ++;
	},

	destoryPipe: function() {
		this.pipes.shift();
		this.pipeNum --;
	},

	bindEvent: function() {
		var self = this;
		document.addEventListener('keydown', function(e) {
		    if(e.keyCode == 32) {
		        self.spacePressed = true;
		    }
		}, false);
		document.addEventListener('keyup', function(e) {
		    if(e.keyCode == 32) {
		        self.spacePressed = false;
		    }
		}, false);
	},

	gameOver: function() {
		var self = this;
		this.pop.style.display = 'block';
    	cancelAnimationFrame(this.raf);
        // document.location.reload();
        this.popText.innerHTML = 'GAME OVER<br/>你的分数是：' + this.score;
        this.popBtn.addEventListener('click', function() {
       		self.reset();
        })    
	},

	draw: function() {
		var opts = this.options,
			self = this;

		this.raf = requestAnimationFrame(this.draw.bind(this));	
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

		if ( (this.canvasWidth - this.x) % (opts.pipePadding + opts.pipeWidth) == 0) {
			this.createPipe();
		}
		if ( this.x < -opts.pipeWidth ) {
			this.destoryPipe();
			this.x = opts.pipePadding;
		}
	    if ( this.birdY <= 0 ) {
	    	this.birdY = 0;
	    };
		// 键盘控制   
		if ( this.spacePressed ) {
	        this.birdY -= opts.birdUp; 
	    }

	    this.drawBird();
		this.drawPipe();
		this.drawScore();

	    // 碰撞检测
	    if ( this.birdY >= this.canvasHeight - opts.birdHeight ) {
	    	this.gameOver();
	    }
	    if ( (this.x < opts.birdX + opts.birdWidth) && this.x > ( opts.birdX - opts.pipeWidth ) ) {
	    	if ( this.birdY < this.pipes[0] || this.birdY + opts.birdHeight > opts.pipeSpace + this.pipes[0] ) {  
	    		this.gameOver();
	    	}
	    }
	    if ( this.x + opts.pipeWidth == opts.birdX ) {
	    	this.score++;
	    }
		this.x += opts.dx;
		this.birdY += opts.dy;  
	}
}
flappy.init();


// var raf;
// var canvas = document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');
// // 分数
// var score = 0;
// // 水管起始位置
// var x = canvas.width;
// // 小鸟宽高及位置
// var birdWidth = 30;
// var birdHeight = 30;
// var birdX = 100;
// var birdY = (canvas.height - birdHeight)/2;
// // 水管移动速度及小鸟下降速度
// var dx = -1;
// var dy = 1.5;
// // 水管宽度、间距及上下水管空隙
// var pipeWidth = 30;
// var pipePadding = 100;
// var pipeSpace = 120;
// // 屏幕内水管数量
// var pipeNum = 0;
// // 水管参数数组
// var pipes = [];
// // 键盘控制
// var spacePressed = false;
// // 键盘事件监听
// document.addEventListener("keydown", keyDownHandler, false);
// document.addEventListener("keyup", keyUpHandler, false);
// // 键盘事件处理
// function keyDownHandler(e) {
//     if(e.keyCode == 32) {
//         spacePressed = true;
//     }
// }
// function keyUpHandler(e) {
//     if(e.keyCode == 32) {
//         spacePressed = false;
//     }
// }
// // 绘制分数
// function drawScore() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "#0095DD";
//     ctx.fillText("Score: " + score, 8, 20);
// }
// // 绘制小鸟
// function drawBird() {
// 	ctx.beginPath();
// 	ctx.rect(birdX, birdY, birdWidth, birdHeight);
// 	ctx.fillStyle = 'yellow';
// 	ctx.fill();
// 	ctx.closePath();
// }
// // 绘制水管
// function drawPipe() {	
// 	for (var n = 0; n <= pipeNum; n++) {
// 		var h = pipes[n],
// 			startX = x + (pipeWidth + pipePadding) * n;
// 		ctx.beginPath();
// 		ctx.rect(startX, 0, pipeWidth, h);
// 		ctx.rect(startX, pipeSpace + h, pipeWidth, canvas.height - h - pipeSpace);
// 		ctx.fillStyle = 'green';
// 		ctx.fill();
// 		ctx.closePath();
// 	};
// }
// // 生成水管参数
// function createPipe() {
// 	//此处计算写死，需调整
// 	var pipeHeight = Math.ceil(Math.random()*9)*20;
// 	pipes.push(pipeHeight);
// 	pipeNum ++;
// }
// // 销毁水管参数
// function destoryPipe() {
// 	pipes.shift();
// 	pipeNum --;
// }
// // 绘制
// function draw() {
// 	ctx.clearRect(0, 0, canvas.width, canvas.height);
// 	drawBird();
// 	drawPipe();
// 	drawScore();
// 	if ( (canvas.width - x) % (pipePadding + pipeWidth) == 0) {
// 		createPipe();
// 	}
// 	if ( x < -pipeWidth ) {
// 		destoryPipe();
// 		x = pipePadding;
// 	}
// 	// 键盘控制   
// 	if ( spacePressed ) {
//         birdY -= 7;
//     }
//     // 碰撞检测
//     if ( birdY >= canvas.height - birdHeight ) {
//     	alert('GAME OVER');
//     	cancelAnimationFrame(raf);
//         document.location.reload();
//     }
//     if ( birdY <= 0 ) {
//     	birdY = 0;
//     };
//     if ( (x < birdX + birdWidth) && x > ( birdX - pipeWidth ) ) {
//     	if ( birdY < pipes[0] || birdY + birdHeight > pipeSpace + pipes[0] ) {  
//     		alert('GAME OVER');
//     		cancelAnimationFrame(raf);
//         	document.location.reload();
//     	}
//     }
//     if ( x + pipeWidth == birdX ) {
//     	score++;
//     }
// 	x += dx;
// 	birdY += dy;
// 	raf = requestAnimationFrame(draw);
// }
// draw();


	
	