const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./config')
const { env } = process
const devConfig = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: './src/ui/index.html',
      historyApiFallback: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
    }),
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(process.cwd(), '/src', '/public'),
    historyApiFallback: true,
    hot: true,
    proxy: {
      '/graphql': 'http://localhost:4545/',
      '/api': 'http://localhost:4545/',
    },
  },
  output: {
    path: path.join(process.cwd(), '/out'),
    publicPath: '/',
    filename: 'bundle.js',
  },
}

module.exports = {
  ...baseConfig,
  ...devConfig,
}
