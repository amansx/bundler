const Bundler = require('../lib');

Bundler.		

	init('webpack').

	context().
		dir('src').

	entry()
		.glob('*.tsx').

	resolve().
		module().dir('src').

	output().
		setDefaults().

	use(
		Bundler.prefab('typescriptWorker'),
		Bundler.prefab('typescript'),
		Bundler.prefab('postcss')
	).

	use(
		Bundler.prefab('featureFlags'),
		Bundler.prefab('markup')
	).

	watch()