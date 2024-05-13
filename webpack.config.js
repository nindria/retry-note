const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname, './main.js')
    }, // Path ke file utama aplikasi Anda
    output: {
        filename: '[name]bundle.js', // Nama file bundle yang akan dihasilkan
        path: path.resolve(__dirname, 'dist'), // Direktori tempat bundle akan disimpan
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Menggunakan loader babel untuk file JavaScript
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },

            {
                test: /\.css$/, // Menggunakan loader css untuk file CSS
                use: [
                    {
                        loader: 'style-loader,',
                    },
                    {
                        loader: 'css-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'), // Path ke file HTML template
            filename: 'index.html', // Nama file HTML yang akan dihasilkan
        }),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'), // Menentukan direktori tempat file statis disajikan
          }, // Menunjukkan webpack-dev-server untuk server dari direktori dist
         
    },
};