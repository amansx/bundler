class Typescript {
	_opts = {};

	constructor(deps) {
		this.webpack = deps.webpackBundler;
		this.setOptionsBabelTypescript();
	}

	appendOptionBabelPreset(presetName) {
		if (!Array.isArray(this._opts.presets)) {
			this._opts.presets = [];
		}
		this._opts.presets.push(presetName);
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
		this.appendOptionBabelPreset('@babel/preset-env');
		this.appendOptionBabelPreset('@babel/preset-typescript');
		this.appendOptionBabelPreset('@babel/preset-react');

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

	init() {
		this.webpack.resolve().ext('.ts', '.tsx');
		const rule = this.webpack.module().rules().new()
		
		rule.
			test(/\.tsx?$/).
			excludeNodemodules().
			new().
				loader('babel-loader').
				setOptions(this._opts).

		commit()
	}

}

module.exports = Typescript