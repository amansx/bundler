const CWD                 = process.cwd();
const path                = require('path');
const webpack             = require('webpack');
const DEFAULTS            = require('./constants');
const BundleOptimizations = require('./optimizations');
const BabelLoader         = require('./loaders/babel');

const {HtmlWebpackPlugin, HTMLTemplate} = require('./plugins/html');

class BaseConfig {
	entry    = {};
	mode     = 'none';
	output   = {
		path: path.resolve(
			CWD,
			DEFAULTS.OUTPUT_DIR_NAME
		)
	};
	module = {
		rules: []
	};
	plugins = [];

	addIndexToEntry() {
		this.entry[DEFAULTS.ENTRY] = {
			import  : "./app.tsx",
			filename: DEFAULTS.OUTPUT_FILENAME,
		};
	}

	loadOptimizations(name, filepath) {
		this.optimization = new BundleOptimizations()
	}
	
	loadRules(name, filepath) {
		this.module.rules.push(
			new BabelLoader(),
		)
	}
	
	loadPlugins(name, filepath) {
		this.plugins.push(
			new HtmlWebpackPlugin({ 
				inject          : false,
				templateContent : HTMLTemplate,
				meta            : { 
					'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no' 
				},
			})
		)

		this.plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': '"development"',
			})
		)
	}
	
	constructor() {
		this.addIndexToEntry()
		this.loadOptimizations()
		this.loadRules()
		this.loadPlugins()
	}
}

module.exports = BaseConfig;