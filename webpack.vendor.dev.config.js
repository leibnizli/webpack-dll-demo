var path = require('path');
var webpack = require("webpack");

module.exports = [{
    name: "vendor-dev",
    entry: {
        vendor:[path.join(__dirname, "src", "vendor.js")]

    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].bundle.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname,"src", "dll", "[name]-manifest.json"),
            name: "[name]",
            context: __dirname
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