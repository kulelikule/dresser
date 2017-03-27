var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var baseWebpackConfig = require('./webpack.base.conf');

//用来监测知否新增或者删除组件
const exec = require('child_process').exec;
exec('node generator.js', (error, stdout, stderr) => {
    if(error) throw error;
});

module.exports = merge(baseWebpackConfig, {
    entry: {
        index: './web/js/index.js'
    },
    output: {
        path: path.join(__dirname, 'web', 'dist'),
        publicPath: '/web/dist/',
        filename: 'js/[name]-[hash].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    devtool: "cheap-module-eval-source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载
        new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './web/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/index.html', //生成的html存放路径，相对于path
            template: './web/view/index.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],
    //使用webpack-dev-server，提高开发效率
    devServer: {
        contentBase: './',
        host: 'localhost',
        port: 9090,
        inline: true,
        hot: true,
    }
});