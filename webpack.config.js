const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output:{
        path: path.join(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: './',
    },
    devServer: {
        port: 3010,
        static: {
            directory: path.join(__dirname, 'public'),
          },
        historyApiFallback: true, 
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',  
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                },
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new CopyWebpackPlugin({
            patterns: [
              { from: 'public/assets', to: 'assets' },
            ],
        }),
        new Dotenv(),
    ]
}