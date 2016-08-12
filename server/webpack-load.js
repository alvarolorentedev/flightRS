var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require('webpack');
var webpackConfig = require('../webpack.config.js');

var compiler = webpack(webpackConfig);
function loadwebpack(app){
    app.use(webpackDevMiddleware(compiler, {
      hot: true,
      publicPath: '/www',
      stats: {
        colors: true,
      },
      historyApiFallback: true
    }));
    app.use(webpackHotMiddleware(compiler, {}));
}

module.exports = loadwebpack;