const CWD = process.cwd();
const path = require('path');
const FeatureFlags = require('dotenv-webpack');

class PluginEnvFeatureFlag{

	constructor(deps) {
		this.webpack = deps.webpackBundler;
		this.ENV_DIR = deps.REQUESTER_DIR;
	}

	init() {
		const env = process.env.NODE_ENV;
		this.webpack.plugins().append(new FeatureFlags({
			defaults         : path.join(this.ENV_DIR, `.env.default.flags`),
			path             : path.join(this.ENV_DIR, `.env.${env}.flags`),
			allowEmptyValues : true,
			silent           : true,
			safe             : false,
			systemvars       : false,
		}))

	}

}

module.exports = PluginEnvFeatureFlag;