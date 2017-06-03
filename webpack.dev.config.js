var path = require('path');
var webpack = require("webpack");

module.exports = [{
    name: "dev",
    entry: {
        app:[path.join(__dirname, "src", "entry.js")]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: "./build/", //资源文件引用的目录
        filename: "[name].bundle.js"
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         'NODE_ENV': JSON.stringify('production')
        //     }
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("./src/dll/vendor-manifest.json")
        }),
        //new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         drop_console: false,
        //         drop_debugger: false,
        //         //screw_ie8 : false
        //     },
        //     comments: false,
        // })
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