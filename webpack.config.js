var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        historyApiFallback: true,
        rewrites: [
            { from: /^\/subpage/, to: '/views/subpage.html' },
        ],
    },
    entry: './js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        publicPath: "/",
        chunkFilename: "[name].chunk.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', "stage-0"],
                    plugins: [
                        ["transform-runtime", {
                        "polyfill": false,
                        "regenerator": true
                        }]
                    ]
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: ({ resource }) => {
                return resource && resource.endsWith('.js') && resource.indexOf('node_modules') >= 0;
            }
        })
    ],
    stats: {
        colors: true
    }
};