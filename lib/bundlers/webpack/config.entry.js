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

	config() {
		return this.entries;
	}
}

module.exports = WebpackConfigEntry;