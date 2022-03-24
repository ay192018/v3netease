//配置选项;
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
};
