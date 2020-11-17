const BaseConfig = require('./base');

class WebpackConfigBuilder {
	constructor() {
		const config = new BaseConfig();
		this.config = config;
	}

	build() {
		const config = JSON.stringify(this.config, null, 4);
		console.log(config);
		return this.config;
	}

}


module.exports = WebpackConfigBuilder;