const webpack = require('webpack');
module.exports = {
	entry: [
		`${__dirname}/client/index.js`
	],
	output: {
		path: `${__dirname}/public/js`,
		filename: 'bundle.js',
	},
	plugins: [
		new webpack.DefinePlugin({}),
	],
	module: {
		loaders: [{
			teset: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015', 'react', 'stage-0'],
			},
		}],
	},
}
