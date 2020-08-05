module.exports = {
  devServer: {
    public: '0.0.0.0:8080',
    disableHostCheck: true,
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
