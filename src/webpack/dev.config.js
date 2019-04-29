const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config')
const { env } = process
const devConfig = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
    new HtmlWebpackPlugin(),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:4545/',
      '/api': 'http://localhost:4545/',
    },
  },
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}
