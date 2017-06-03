var path = require('path');
var webpack = require("webpack");

module.exports = [{
    name: "vendor-build",
    entry: {
        vendor:[path.join(__dirname, "src", "vendor.js")]

    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.min.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname,"src", "dll", "[name]-manifest.json"),
            name: "[name]",
            context: __dirname
        }),
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: false,
                drop_debugger: false,
                //screw_ie8 : false
            },
            comments: false,
        })
    ],
    module: {
        rules: [{
            test: /\.js|jsx$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react']
                }
            }]

        }]
    }
}]