class Typescript {
	_opts = {};

	constructor(deps) {
		this.webpack = deps.webpackBundler;
	}

	appendOptionBabelPreset(presetName, config) {
		if (!Array.isArray(this._opts.presets)) {
			this._opts.presets = [];
		}
		this._opts.presets.push([presetName, config]);
		return this;
	}

	appendOptionBabelPlugin(pluginName, opts) {
		if (!Array.isArray(this._opts.plugins)) {
			this._opts.plugins = [];
		}
		this._opts.plugins.push([pluginName, opts]);
		return this;
	}

	setOptionsBabelTypescript() {
		this.appendOptionBabelPreset('@babel/preset-env', {"modules": "commonjs"});
		this.appendOptionBabelPreset('@babel/preset-typescript');
		this.appendOptionBabelPreset('@babel/preset-react');

		this.appendOptionBabelPlugin('@babel/plugin-transform-runtime');
		this.appendOptionBabelPlugin('@babel/plugin-transform-async-to-generator');
		this.appendOptionBabelPlugin('@babel/plugin-proposal-decorators', {
			'legacy': true
		});
		this.appendOptionBabelPlugin('@babel/plugin-proposal-class-properties', {
			'loose' : true
		});
		this.appendOptionBabelPlugin('@babel/plugin-proposal-private-methods', {
			'loose': true
		});
		this.appendOptionBabelPlugin('@babel/plugin-proposal-private-property-in-object', {
			'loose': true
		});
		this.appendOptionBabelPlugin('@babel/plugin-proposal-export-default-from');
		this.appendOptionBabelPlugin('@babel/plugin-proposal-export-namespace-from');
		this.appendOptionBabelPlugin('@babel/plugin-proposal-nullish-coalescing-operator');
		this.appendOptionBabelPlugin('@babel/plugin-proposal-optional-chaining');
	}

	getBabelOptions() {
		return this._opts;
	}

	init() {
		this.setOptionsBabelTypescript();
		this.webpack.resolve().ext('.ts', '.tsx');

		const rule = this.webpack.module().rules().new()
		rule.
			test((f) => f.match(/\.tsx?$/) && !f.match(/\.async\.ts$/)).
			new().
				loader('babel-loader').
				setOptions(this._opts).

		commit()
	}

}

module.exports = Typescript