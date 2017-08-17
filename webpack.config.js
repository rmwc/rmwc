const webpack = require('webpack');
const path = require('path');
const root = path.normalize(__dirname);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

module.exports = function(env) {
	const baseConfig = {
		node: {
			fs: 'empty',
			module: 'empty',
			net: 'empty'
		},
		entry: {
			'styles': [path.join(root, 'docs/styles.js')],
			'polyfills': [path.join(root, 'docs/polyfills.js')],
			'app': path.join(root, 'docs/app.js')
		},
		output: {
			filename: '[name].[hash].js',
			path: path.join(root, 'public'),
			publicPath: './'
		},
		resolve: {
			alias: {
				docs: path.resolve(root, 'docs'),
				rmdc: path.resolve(root)
			}
		},
		module: {
			rules: [{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader?cacheDirectory=true&extends=' + path.join(root, '/.babelrc')
				}
			}]
		},
		plugins: [
			new webpack.ContextReplacementPlugin(
				/babel-core(\\|\/)lib(\\|\/)transformation(\\|\/)file(\\|\/)options$/,
				root
			),
			new webpack.ContextReplacementPlugin(
				/babel-core(\\|\/)lib(\\|\/)transformation(\\|\/)file$/,
				root
			),
			new HtmlWebpackPlugin({
				template: 'docs/index.ejs'
			})
		]
	};

	const devConfig = {
		cache: true,
		entry: {
			'app': [
				'react-hot-loader/patch',
				path.join(root, 'docs/app.js')
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		],
		devtool: 'inline-source-map',
		devServer: {
			hot: true,
			historyApiFallback: true,
			disableHostCheck: true,
			compress: true,
			clientLogLevel: 'warning',
			contentBase: path.join(root, 'public'),
			publicPath: '/'
		}
	};

	if (process.argv.some(val => ~val.search('webpack-dev-server'))) {
		return merge.smart(baseConfig, devConfig);
	} else {
		return baseConfig;
	}
};
