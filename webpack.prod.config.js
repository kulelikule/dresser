var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'dresser.js',
        library: 'dresser',
        libraryTarget: 'umd',
        umdNamedDefine: true
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
        })
    ]
}