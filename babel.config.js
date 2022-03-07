module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "exclude": ["@babel/plugin-transform-regenerator"]
            }
        ],
        [
            "@babel/preset-typescript",
            {
                allExtensions: true, //支持所有文件扩展名
            },
        ],
    ],
};
