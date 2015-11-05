global.__CLIENT__ = false;
require('babel/register')({
  stage: 0,
});

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var path = require('path');

var appPort = 1337;
var proxy = 'http://localhost:' + appPort;

var devServer = new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '.tmp'),
  publicPath: '/public/',
  hot: true,
  historyApiFallback: true,
  proxy: [
    {
      path: /^(?!\/public).*$/,
      target: proxy
    }
  ]
});

devServer.listen(3000, 'localhost', function () {
  console.log('Listening at http://%s:%s', 'localhost', 3000);
});

var app = require('./src/server');
app.listen(appPort, function () {});
