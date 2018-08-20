module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8080,
    proxy: 'http://localhost:5500'
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
        @import "@/assets/scss/root/reset.scss";
        @import "@/assets/scss/variables.scss";
        `
      }
    }
  },
  configureWebpack: {
    module: {
      rules: [{
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }]
    }
  }
}
