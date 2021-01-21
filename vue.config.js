module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://wwwadmin.iqintong.com/api',
          ws: false,
          changeOrigin: true,
          pathRewrite : {
            "^/api" : ""
          }
        }
      }
    }
  }