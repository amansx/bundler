const _ = require('lodash');

const renderStats = (stats) => {
	console.log(stats);
	
	if (stats.hasErrors()) {
		// console.log(stats.compilation.errors.map(v => v.message));
		console.log(stats.compilation.errors);
		return;
	}

	stats = stats.toJson('verbose');
	console.log(`Completed in: ${stats.time}ms`);
	console.log(`Output path:  ${stats.outputPath}`);
	console.log(stats.
		assets.
			filter(a => a.emitted).
			map(a => `${a.name}: ${a.size}`)
	);
}


module.exports = renderStats;