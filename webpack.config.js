const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const childProcess = require('child_process');
const webpack = require('webpack');


//////////////////
module.exports = {
    target: 'node',
    mode: 'development',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        plugins: [new TsconfigPathsPlugin({})],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
    },
    devtool: false,
    externals: nodeExternals(),

    plugins: [
        // new webpack.NormalModuleReplacementPlugin(
        //     new RegExp('environments/environment.ts'),
        //     envFile,
        // ),
        //
        // // https://webpack.js.org/plugins/define-plugin/
        // new webpack.DefinePlugin({
        //     '__APP_BUILD__': JSON.stringify(commitHash),
        // }),
    ]
};
