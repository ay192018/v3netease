//配置选项;
module.exports = {
  publicPath: "./",
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        views: "@/views",
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://www.codeman.ink:3000", //代理URL
        changeOrigin: true, //是否跨域
        ws: true, //开实时通信
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
