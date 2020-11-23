const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const {CleanWebpackPlugin: CleanPlugin} = require('clean-webpack-plugin')

const linariaLoader = {
	loader: '@linaria/webpack4-loader',
	options: {
		extension: '.styl',
		preprocessor(selector, cssText) {
			return `${selector}${cssText}`
		},
	},
}

module.exports = {
	entry: {
		app: path.resolve(__dirname, 'src', 'index.js'),
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
	},
	resolve: {
		extensions: [
			'.styl',
			'.js',
		],
	},
	mode: process.env.NODE_ENV || 'development',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
					linariaLoader,
				],
			},
			{
				test: /\.styl$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'stylus-loader',
				],
			},
		],
	},
	plugins: [
		new CleanPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[chunkhash].css',
			ignoreOrder: false,
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
			new CssMinimizerPlugin(),
		],
	},
	stats: {
		builtAt: false,
		children: false,
		entrypoints: false,
		hash: false,
		modules: false,
	},
}
