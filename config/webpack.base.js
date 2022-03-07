const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

//进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
    entry: "./src/main.ts",
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.vue$/,
                use: "vue-loader",
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ],
            },
        ],
    },
    cache: {
        type: 'filesystem', // 使用文件缓存
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "webpack5-ts-vue",
            template: "./index.html",
        }),
        new VueLoaderPlugin(),
        // 进度条
        new ProgressBarPlugin()
    ],
};
