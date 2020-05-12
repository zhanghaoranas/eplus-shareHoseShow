const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpack = require("webpack");
const smp = new SpeedMeasurePlugin();

const devMode = process.env.NODE_ENV === "development";

const webpackPlugins = [
	new HtmlWebpackPlugin({
		title: "移动端 webpack搭建",
		template: "template/index.html",
	}),
	new webpack.ProgressPlugin(),
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin({
		filename: devMode ? "css/[name].css" : "css/[name].[hash:6].css",
		chunkFilename: devMode ? "css/[id].css" : "css/[id].[hash:6].css",
	}),
	new FriendlyErrorsWebpackPlugin(),
	new webpack.HotModuleReplacementPlugin(),
];
if (!devMode) {
	webpackPlugins.push(new BundleAnalyzerPlugin());
}
// 使用smp.wrap 热更新会报错。
module.exports = {
	entry: "./src/index.jsx",
	devtool: devMode ? "inline-source-map" : "",
	devServer: {
		historyApiFallback: true,
		contentBase: path.join(__dirname, "dist"),
		port: 8080,
		hot: true,
		quiet: true,
	},
	mode: devMode ? "development" : "production",
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
							hmr: devMode,
						},
					},
					{
						loader: "css-loader",
						options: {
							modules: {
								localIdentName:
									"[name]__[local]--[hash:base64:5]",
							},
						},
					},
					"postcss-loader",
				],
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: true,
							hmr: devMode,
						},
					},
					"css-loader",
					"postcss-loader",
				],
			},
			{
				test: /\.(jsx|js)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "thread-loader",
						options: {
							workers: 4,
						},
					},
					"babel-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: "file-loader",
						options: {
							outputPath: "images",
						},
					},
				],
			},
		],
	},
	plugins: webpackPlugins,
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			chunks: "all",
		},
	},
	stats: "errors-only",
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
		swiper: "Swiper",
	},
	output: {
		filename: "js/bundle.[hash].js",
		path: path.resolve(__dirname, "dist"),
		publicPath: "/",
	},
};
