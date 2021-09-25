module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://192.168.1.58:12700",
        pathRewrite: { "/api": "" },
      },
    },
  },
};
