const WebpackConfigBuilder = require('./builder');
const config = new WebpackConfigBuilder();

module.exports = config.build();