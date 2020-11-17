const _       = require('lodash');
const path    = require('path');
const webpack = require('webpack');

const Bundler = require('./bundler')
const ConfigEntry   = require('./webpack/config.entry');
const ConfigContext = require('./webpack/config.context');
const ConfigModule  = require('./webpack/config.module');
const ConfigResolve = require('./webpack/config.resolve');
const ConfigOutput  = require('./webpack/config.output');
const ConfigPlugin  = require('./webpack/config.plugin');

class Webpack extends Bundler {
	_mode = 'none';

	constructor(deps) {
		super(deps);
		this._injector = deps.Injector;

		this.debug()
	}

	getInjector() {
		return this._injector;
	}

	debug() {
		process.env.NODE_ENV = "debug";
		this.plugins().setNodeENV();
		return this;
	}

	development() {
		process.env.NODE_ENV = "development";
		this.plugins().setNodeENV();
		return this;
	}

	production() {
		process.env.NODE_ENV = "production";
		this.plugins().setNodeENV();
		return this;
	}

	context() {
		this._context = new ConfigContext(this)
		return this._context;
	}
	
	entry() {
		if (!this._entry) this._entry = new ConfigEntry(this);
		return this._entry;
	}

	resolve() {
		if (!this._resolve) this._resolve = new ConfigResolve(this);
		return this._resolve;
	}

	plugins() {
		if (!this._plugins) this._plugins = new ConfigPlugin(this);
		return this._plugins;
	}
	
	module() {
		if (!this._module) this._module = new ConfigModule(this);
		return this._module;
	}
	
	output() {
		this._output = new ConfigOutput(this)
		return this._output;
	}

	use(...prefabs) {
		for (let prefab of prefabs) {
			prefab.init();
		}
		return this;
	}

	config() {
		return {
			mode       : this._mode,
			entry      : this._entry   ? this._entry.config()   : undefined,
			context    : this._context ? this._context.config() : undefined,
			module     : this._module  ? this._module.config()  : undefined,
			resolve    : this._resolve ? this._resolve.config() : undefined,
			output     : this._output  ? this._output.config()  : undefined,
			plugins    : this._plugins ? this._plugins.config() : [],
		}
		return this;
	}

	build() {
		console.log(JSON.stringify(this.config(), null, 4));

		webpack(this.config(), (err, stats) => {
			// if (err) {
			// 	console.log(err);
			// }
			// if (stats.hasErrors()) {
			// 	console.log(stats.compilation.errors.map(v => v.message));
			// 	console.log(stats.compilation.errors);
			// }
		});

		return this;
	}
	
	watch() {
		const config = {
			...this.config(),
			watch        : true,
			watchOptions : {
				ignored: /node_modules/
			},
			devServer: {
				contentBase: path.join(process.cwd(), 'example'),
				watchContentBase: true,
				port: 9000
			}
		};
		
		console.log(JSON.stringify(config, null, 4));

		webpack(config, (err, stats) => {
			console.log(err, stats);
			// if (err) {
			// 	console.log(err);
			// }
			// if (stats.hasErrors()) {
			// 	// console.log(stats.compilation.errors.map(v => v.message));
			// 	console.log(stats.compilation.errors);
			// }
		});

		return this;
	}

}

module.exports = Webpack