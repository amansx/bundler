const webpack = require('webpack');
const config  = require('./webpack/index');

webpack(
	config,
	(err, stats) => {
		if (err) {
			console.log(err);
		}
		if (stats.hasErrors()) {
			// console.log(stats.compilation.errors.map(v => v.message));
			console.log(stats.compilation.errors);
		}
	}
);