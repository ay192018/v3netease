//配置选项;
const path = require('path');
const bright = path.join(__dirname, './src/less/bright.less');
const dark = path.join(__dirname, './src/less/dark.less');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'html',
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        views: '@/views',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.codeman.ink:3000', //代理URL
        /*   http://www.codeman.ink:3000 */
        changeOrigin: true, //是否跨域
        ws: true, //开实时通信
        pathRewrite: {
          '^/api': '',
        },
      },
      '/qq': {
        target: 'http://localhost:2000', //代理URL
        /*   http://www.codeman.ink:3000 */
        changeOrigin: true, //是否跨域
        ws: true, //开实时通信
        pathRewrite: {
          '^/qq': '',
        },
      },
    },
  },
  /*   css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 此处修改样式
            // 直接覆盖变量或者通过 less 文件覆盖
            hack: `true; @import "${bright}";`,
          },
        },
      },
    },
  }, */
};
