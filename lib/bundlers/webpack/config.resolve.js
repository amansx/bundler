const path = require('path');

class WebpackConfigResolveModule {
	_modules = [];

	constructor(bundler) {
		this._bundler = bundler;
	}

	dir(...dirname) {
		const modulepath = this._bundler.dir(...dirname);
		this._modules.push(modulepath);
		return this._bundler;
	}

	cwd(...dirname) {
		const modulepath = this._bundler.cwd(...dirname);
		this._modules.push(modulepath);
		return this._bundler;
	}

	toObject() {
		return [...this._modules, 'node_modules'];
	}
}

class WebpackConfigResolve {
	_alias      = {};
	_extensions = ['.js', '.jsx', '.mjs', '.json', '.wasm'];

	constructor(bundler) {
		this._bundler = bundler;
	}

	alias(name) {
		this._name = name;
		return this;
	}

	dir(...dirname) {
		this._alias[this._name] = path.join(CWD, ...dirname);
		return this._bundler;
	}

	cwd(...dirname) {
		this._alias[this._name] = path.join(CWD, ...dirname);
		return this._bundler;
	}

	source(src) {
		this._alias[this._name] = src;
		return this._bundler;
	}

	module() {
		this._modules = new WebpackConfigResolveModule(this._bundler);
		return this._modules;
	}

	ext(...ext) {
		this._extensions = this._extensions.concat([...ext])
		return this._bundler;
	}

	config() {
		return {
			alias      : this._alias,
			extensions : this._extensions,
			modules    : this._modules.toObject(),
		}
	}

}

module.exports = WebpackConfigResolve;