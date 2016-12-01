'use strict';
/**
 * @author Yetty
 * @date 2016-11-30
 * @desc 俄罗斯方块
 */
var tetris = {
  init: function() {
    this.creatCanvas();
  },
  // 创建画布并绘制背景
  creatCanvas: function() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;
    document.body.appendChild(canvas);
    var xNum = 10,
      yNum = 15;
    ctx.strokeStyle = "#ddd";
    for (var i = 0; i < xNum; i++) {
      for (var n = 0; n < yNum; n++) {
        ctx.strokeRect(30 * i, 30 * n, 30, 30);
      };
    };
  },
  // 创建游戏对象
  creatObject: function() {
  },
  // 处理用户输入
  handleEnter: function() {
  }
}
tetris.init();