const fs           = require('fs'); 
const _            = require('lodash');
const path         = require('path');
const webpack      = require('webpack');
const CONFIG_DIR   = 'configs';

class WebpackConfigPlugins {
	_plugins = [];

	constructor(parent) {
		this._parent = parent
	}

	append(plugin) {
		this._plugins.push(plugin);
		return this._parent;
	}

	// shim(name, filepath) {
	// 	const data = fs.readFileSync(filepath, {encoding:'utf8', flag:'r'});
	// 	const kp = {[`__${name}__`]: JSON.stringify(JSON.stringify(data))}
	// 	this._plugins.push(new webpack.DefinePlugin(kp));
	// 	return this;
	// }

	define(key, value) {
		const kp = {[key]: value}
		this._plugins.push(new webpack.DefinePlugin(kp));
		return this;
	}

	setNodeENV(key, value) {
		this.define('process.env.NODE_ENV', JSON.stringify(process.env.NODE_ENV));
		return this._parent;
	}

	config() {
		return this._plugins;
	}
}

module.exports = WebpackConfigPlugins;