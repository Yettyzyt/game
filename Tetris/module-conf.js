'use strict';

module.exports = {
  creator: 'Yetty', // 模块创建者
  app: 'game', // 项目名称
  common: 'gb', // 公共模块名称
  module: 'Tetris', // 当前模块名
  moduleId: 'd7304450-b6fb-11e6-89ea-812cf719f041',
  description: '俄罗斯方块', // 模块简要信息
  tmpId: '569de8ea37152c45afb88ff5',
  support : {
    csslint: {
      enable: true
    },
    jslint: {
      enable: true
    },
    imagemin: { // 图片压缩的配置
      exclude: [] // 图片压缩排除的图片
    },
    autoprefixer: { // 自动前缀的配置
      pc: [
      	'last 3 versions',
      	'Explorer >= 8',
      	'Chrome >= 21',
        'Firefox >= 1',
        'Edge 13'
      ],
      mobile: [
      	'Android >= 4',
      	'iOS >= 6'
      ]
    },
    px2rem: {
      enable: false,
      root_value: 40,
      unit_precision: 5,
      prop_white_list: [],
      selector_black_list: [],
      replace: true,
      media_query: false
    },
    fontcompress : {
      enable: false
    },
    csssprite: {
      enable: true,
      retina: false,
      rootvalue: 0
    }
  }
};
