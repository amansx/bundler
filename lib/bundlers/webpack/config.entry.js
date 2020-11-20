const path = require('path');
const glob = require('fast-glob');

class WebpackConfigEntry {
	entries = {};

	constructor(parent) {
		this.parent = parent;
	}

	name(name) {
		if (!name) name = "app";
		this._name = name;
		return this;
	}

	path(src) {
		this.entries[this._name] = src;
		return this.parent;
	}

	glob(pattern) {
		const entries = glob.sync(pattern, {
			dot: true,
			cwd: this.parent.getInjector().resolve('SRC_DIR')
		});
		for (let entry of entries) {
			this.entries[entry] = `./${entry}`;
		}
		return this.parent;
	}

	config() {
		return this.entries;
	}
}

module.exports = WebpackConfigEntry;