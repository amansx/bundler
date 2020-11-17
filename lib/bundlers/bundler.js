const _     = require('lodash');
const path  = require('path');
const stack = require('callsite');
const CWD   = process.cwd();

class Bundler {

	constructor(deps) {
		this.REQUESTER_DIR = deps.REQUESTER_DIR;
		this.REQUESTER_CWD = deps.REQUESTER_CWD;
	}

	dir(...dirname) {
		return path.join(this.REQUESTER_DIR, ...dirname);
	}

	cwd(...dirname) {
		return path.join(this.REQUESTER_CWD, ...dirname);
	}

}


module.exports = Bundler;