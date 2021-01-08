module.exports = {
  devServer: {
    port: 3500,
  },
  configureWebpack: {
    module: {
      rules: [
        {
          resourceQuery: /blockType=config/,
          loader: require.resolve('./loaders/config-loader.js'),
        },
      ],
    },
  },
}
