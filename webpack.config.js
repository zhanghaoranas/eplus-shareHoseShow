const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const devMode = process.env.NODE_ENV === 'development';

module.exports = {
	entry: './src/index.jsx',
	devtool: devMode ? 'inline-source-map' : '',
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, 'dist'),
		port: 8080,
		hot: true
	},
	mode: devMode ? 'development' : 'production',
	module: {
		rules: [{
			test: /\.css$/,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						esModule: true,
						hmr: devMode,
						// publicPath: '',
					}
				},
				'css-loader',
				'postcss-loader',
			]
		}, {
			test: /\.(jsx|js)$/,
			exclude: /node_modules/,
			loader: "babel-loader"
		}],

	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '移动端 webpack搭建',
			template: 'template/index.html'
		}),
		new webpack.ProgressPlugin(),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
			chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	output: {
		filename: 'js/bundle.[hash].js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
};