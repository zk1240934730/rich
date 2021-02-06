module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://tuiyouqian.wudaojz.com/',
          ws: false,
          changeOrigin: true,
          // pathRewrite : {
          //   "^/api" : ""
          // }
        }
      }
    },
    publicPath: '/dist'
  }