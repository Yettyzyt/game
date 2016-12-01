'use strict';

module.exports = {
  app: 'game', // 项目英文名
  appId: 'df659560-b6f8-11e6-85df-0167c1362fa6', // 项目ID
  description: '游戏开发',
  platform: 'pc', // 平台 pc or mobile
  common: 'gb', // 公共模块名称
  moduleList: ['gb', 'Tetris', 'Pinball', 'Breakout', 'Flappy'],
  tmpId: '569de8ea37152c45afb88ff5', // 选用模板
  shtml: {  //页面片配置
    use: true, //是否使用
    needCombo: true // 页面片中链接是否合并
  },
  deploy: { //项目部署配置，可自己增加另外的需要进行ftp上传的机器
    local: { // 本地预览配置
      fdPath: '/'
    },
    preview: { // 目的预览机的配置，字段名固定
     mode: 'ftp',
      host: 'labs.qiang.it',
      user: 'labs',
      pass: 'labslabslabs',
      port: 22,
      fdPath: '/yetty/',
      domain: 'labs.qiang.it',
      remotePath: '/usr/share/nginx/html/public/labs/yetty/game'
    }
  }
};
