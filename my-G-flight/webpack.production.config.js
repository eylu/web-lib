var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
module.exports = {
    entry: {
        app: ['babel-polyfill', __dirname + '/src/main.js']
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        // publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react'],        // babel 配置项中
                plugins: [
                    "lodash",
                    ["import", { libraryName: "antd", style: "css" }],
                    ["transform-decorators-legacy"]
                ]
            }
        },{
            test: /\.css$/,
            // loader: 'style!css'
            loader: ExtractTextPlugin.extract('style', 'css')
        }, {
            test: /\.less$/,
            loader: 'style!css?modules!less',
            include: /src/
        }, {
            test: /\.(png|jpg|svg|eot|ttf|woff|woff2)$/,
            loader: 'url-loader?limit=2048000&name=[hash:8].[name].[ext]'
        },{
            test: /\.json$/,
            loader: 'json'
        }]
    },
    plugins: [
        new LodashModuleReplacementPlugin({
          'collections': true,
          'paths': true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname , "src", "index.tmpl.html")
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })
    ]
};
