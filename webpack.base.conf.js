var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    resolve: {
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: generateCssLoaders(['css'])
                    }),
                    less: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: generateCssLoaders(['css', 'postcss', 'less'])
                    })
                }
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: generateCssLoaders(['css'])
            })
        },{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: generateCssLoaders(['css', 'postcss', 'less'])
            })
        },{
            //文件加载器，处理文件静态资源
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader?name=fonts/[name].[ext]'
        }, {
            //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
            //如下配置，将小于8192byte的图片转成base64码
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=8192&name=img/[name].[ext]'
        }]
    }
}

function generateCssLoaders(loaders){
    return loaders.map((name) => {
        var sourceMap = process.env.NODE_ENV === "production" ? false : true;
        return {
            loader: name + '-loader',
            options: {
                sourceMap
            }
        }
    });
}