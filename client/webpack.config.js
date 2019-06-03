const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module : {
        rules : [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {}
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['eslint-loader']
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.join(__dirname, "src", "public", "index.html"),       
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin()
    ]
}