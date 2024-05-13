const { merge } = require ('webpack-merge');
const path = require('path');
const config = require('./webpack.config')

module.exports = merge(config, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        open: true,
        compress: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
    },
});