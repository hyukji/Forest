module.exports = {
  devServer: {
    proxy: {
      // proxyTable 설정
      "/api": {
        target: "http://127.0.0.1:3030/api",
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
  transpileDependencies: ["vuetify"],
}
