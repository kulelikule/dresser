var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '../',
        filename: 'js/dresser.js',
        library: 'dresser-mobile',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    /*第三方库不被打入包里*/
     externals: {
         'echarts': 'echarts',
         'uuid': 'uuid',
         'muse-ui': 'muse-ui',
         'muse-ui-css': 'muse-ui/dist/muse-ui.css',
         'axios': 'axios'
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