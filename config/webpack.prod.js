const { merge } = require("webpack-merge");

const baseConfig = require("./webpack.base.js");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        clean: true,
        filename: '[name][chunkhash:8].js',
    },// splitChunks默认配置
    optimization: {
        splitChunks: {
            chunks: 'all',  // 无论同步引入还是异步引入
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,  // 匹配node_modules目录下的文件
                    priority: -10   // 优先级配置项
                },
                default: {
                    minChunks: 2,  // 至少引用了2次
                    priority: -20,   // 优先级配置项
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin(
            {
                filename: '[name][contenthash:8].css'
            }
        ),
        //new BundleAnalyzerPlugin()
    ],
});
