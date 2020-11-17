const Bundler = require('../lib');

Bundler.		

	init('webpack').

	entry()
		.name('app')
		.path('./app.tsx').

	resolve().
		module().dir('src').

	context().
		dir('src').

	output().
		setDefaults().

	use(
		Bundler.prefab('typescript'),
		Bundler.prefab('postcss')
	).

	use(
		Bundler.prefab('featureFlags')
	).

	watch()