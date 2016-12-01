'use strict';
/**
 * @author Yetty
 * @date 2016-12-1
 * @desc flappy bird
 */
var canvas = document.getElementById('maCanvas');
var ctx = canvas.getContext('2d');

function drawBird() {
  ctx.beginPath();
  ctx.rect(0, 0, 10, 10);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  drawBird();
}