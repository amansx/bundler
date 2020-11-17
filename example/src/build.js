const Bundler = require('../lib');

Bundler.
		
		use('webpack').

		entry()
			.name('app')
			.path('./app.tsx').

		context().
			dir().

		output().
			useDefaults().

		use(
			Bundler.prefab('typescript'),
			Bundler.prefab('postcss')
		).
	
		use(
			Bundler.prefab('featureFlags')
		).

		watch()