const path = require('path');
const webpack = require('webpack');
const Typescript = require('./typescript.prefab')

class PluginSetupWorker extends Typescript{

	constructor(deps) {
		super(deps);
		super.setOptionsBabelTypescript();
		this.webpack = deps.webpackBundler;
	}

	init() {

		this.webpack.resolve().ext('.ts');

		const rule = this.webpack.module().rules().new()
			  rule.
				test(/\.__routine__\.ts$/).
					new().
						loader('routine-loader').
						setOptions({
							singleton: true
						}).
					new().
						loader('babel-loader').
						setOptions(super.getBabelOptions()).
		commit()

	}

}

module.exports = PluginSetupWorker;