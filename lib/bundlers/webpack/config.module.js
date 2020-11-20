class WebpackConfigModuleRuleLoader {
	_opts = {};

	constructor(parent) {
		this._parent = parent;
	}

	loader(name) {
		this._loader = name;
		return this;
	}
	
	setOptions(opts) {
		this._opts = opts;
		this._parent.addLoader(this);
		return this._parent;
	}

	config() {
		return {
			loader  : this._loader,
			options : this._opts,
		}
	}

}

class WebpackConfigModuleRule {
	_exclude = [];
	_include = [];
	_loaders = [];

	constructor(parent) {
		this._parent = parent;
	}

	test(regex) {
		this._test = regex;
		return this;
	}

	type(tname) {
		this._type = tname;
		return this;
	}

	assetType() {
		this._type = 'asset';
		return this;
	}

	sourceType() {
		this._type = 'asset/source';
		return this;
	}
	
	new() {
		return new WebpackConfigModuleRuleLoader(this);
	}
	
	addLoader(loader) {
		this._loaders.push(loader.config())
		return this._parent;
	}
	
	commit() {
		this._parent.addRule(this);
		return this._parent;
	}

	exclude(regex) {
		this._exclude.push(regex);
		return this;
	}

	include(regex) {
		this._include.push(regex);
		return this;
	}
	
	issuer(regex) {
		this._issuer.push(regex);
		return this;
	}

	excludeNodemodules(regex) {
		this.exclude(/node_modules/);
		return this;
	}

	config()  {
		return {
			test    : this._test,
			exclude : this._exclude,
			use     : this._loaders,
			type    : this._type,
		}
	}
}

class WebpackConfigModuleRules {
	_rules = [];

	new() {
		return new WebpackConfigModuleRule(this);
	}

	addRule(rule) {
		this._rules.push(rule.config())
		return this;
	}

	config() {
		return this._rules;
	}
}

class WebpackConfigModule {
	_rules = new WebpackConfigModuleRules()

	rules() {
		return this._rules;
	}

	config() {
		return {
			rules: this._rules.config()
		}
	}
}


module.exports = WebpackConfigModule