var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
//设置环境
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = '"development"';
}
var baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
        filename: 'js/dresser.js',
        library: 'dresser',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new ExtractTextPlugin("css/dresser.css"),
        new OptimizeCSSPlugin(),//压缩css
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});