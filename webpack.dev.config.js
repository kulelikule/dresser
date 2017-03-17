var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/web/',
        filename: '[name]-[hash].js',
        chunkFilename: 'js/[id].chunk.js'
    },
    externals: {
        vue: 'vue'
    },
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader'
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        },{
            test: /\.less$/,
            use: [
                "style-loader",
                "css-loader",
                "less-loader"
            ]
        },{
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //热加载
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            favicon: './src/img/favicon.ico', //favicon路径，通过webpack引入同时可以生成hash值
            filename: './view/'+ name +'.html', //生成的html存放路径，相对于path
            template: './src/view/'+ name +'.html', //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['vendors', name],//需要引入的chunk，不配置就会引入所有页面的资源
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
}