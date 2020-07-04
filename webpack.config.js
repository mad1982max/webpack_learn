const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development';
const optimization = () => {
    const config = {
        splitChunks: {
        chunks: 'all'
        }
    }
    if(!isDev) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}
const filename = ext => isDev ? `[name].${ext}`: `[name].[hash].${ext}`;
console.log('IS DEVELOPMENT MOODE:', isDev);


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: 'development',
    entry: {
        main:['@babel/polyfill', './index.js'],
        analitics: './analitics.ts'
},
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    devtool: isDev ? 'source-map': '',
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),

        }
    },
    optimization: optimization(),
    plugins: [
        new MiniCssExtractPlugin({
            filename: filename('css'),
            minify: {
                collapseWhitespace: !isDev
            }
        }),
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
                }
            ]
        })
    ],
    devServer: {
        port: 4200,
        hot: isDev
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpeg|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    },
                    isDev ? 'eslint-loader': ''
                ]

            },
            {
                test: /\.ts$/, 
                exclude: /node_modules/, 
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            "@babel/preset-typescript"
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }

            }
           
        ]
    }
}