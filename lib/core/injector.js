const path = require('path');
const {listModules} = require('awilix');
const {asClass, asValue, asFunction, Lifetime} = require('awilix');
const {createContainer, InjectionMode} = require('awilix');

class Injector {

	constructor(libPath){
		this.libPath = libPath;

		const container = createContainer({
			injectionMode: InjectionMode.PROXY
		})

		this.container = container;
		this.init();
	}

	init() {
		this.registerFunction('Injector', () => {
			return this;
		});

		const modules = [
			['bundlers/**/*.bundler.js', {
				register: asClass,
				lifetime: Lifetime.SINGLETON
			}],
			['language/**/*.prefab.js', {
				register: asClass,
				lifetime: Lifetime.SINGLETON
			}],
			['plugins/**/*.prefab.js', {
				register: asClass,
				lifetime: Lifetime.SINGLETON
			}],
			['styles/**/*.prefab.js', {
				register: asClass,
				lifetime: Lifetime.SINGLETON
			}],
			['markup/**/*.prefab.js', {
				register: asClass,
				lifetime: Lifetime.SINGLETON
			}],
		];

		const opts = {
			cwd         : this.libPath,
			formatName  : 'camelCase'
		};

		this.container.loadModules(modules, opts);
		for (let p of Object.keys(this.container.registrations)) {
			console.log('Registered', p);
		}
		
	}

	registerValue(name, object) {
		this.container.register({
			[name]: asValue(object)
		})
	}
	
	registerFunction(name, fn) {
		this.container.register({
			[name]: asFunction(fn).transient()
		})
	}

	resolve(name) {
		return this.container.resolve(name)
	}

}

let InjectorSingleton;
module.exports = (libPath) => {
	if (!InjectorSingleton) InjectorSingleton = new Injector(libPath);
	return InjectorSingleton;
}