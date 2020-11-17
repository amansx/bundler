const _        = require('lodash');
const path     = require('path');
const libpath  = path.join(__dirname, 'lib');
const injector = require('./lib/core/injector')(libpath);
const stack    = require('callsite');
const CWD      = process.cwd();

class Bundler {

	init(bundlerName) {
		let dir  = __dirname;
		const cs = _.get(stack(), '[1]');
		try {
			dir = path.dirname(cs.getFileName());
		} catch(e) {
		}

		injector.registerValue('REQUESTER_DIR', dir);
		injector.registerValue('REQUESTER_CWD', CWD);

		return injector.resolve(`${bundlerName}Bundler`)
	}

	prefab(bundlerName) {
		return injector.resolve(`${bundlerName}Prefab`)
	}
}

module.exports = new Bundler();