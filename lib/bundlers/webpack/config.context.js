class WebpackConfigContext {

	constructor(bundler) {
		this._bundler = bundler
	}

	dir(...dirname) {
		this._context = this._bundler.dir(...dirname);
		this._bundler.getInjector().registerValue('SRC_DIR', this._context);
		return this._bundler;
	}

	cwd(...dirname) {
		this._context = this._bundler.cwd(...dirname);
		this._bundler.getInjector().registerValue('SRC_DIR', this._context);
		return this._bundler;
	}

	config() {
		return this._context;
	}
}

module.exports = WebpackConfigContext;