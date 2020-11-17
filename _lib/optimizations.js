const NODE_MODULE_REGEX = /[\\/]node_modules[\\/]/;

class WebpackOptimizations {
	minimize               = false;
	// minimize               = true;

	minimizer              = ['...'];
	runtimeChunk           = { name: 'app.runtime' };

	emitOnErrors           = true;

	chunkIds               = 'named';
	// chunkIds               = 'deterministic';

	moduleIds              = 'named';
	// moduleIds    = 'deterministic';

	removeAvailableModules = false;
	// removeAvailableModules = true;

	mergeDuplicateChunks   = true;
	flagIncludedChunks     = true;
	// occurrenceOrder        = true;
	providedExports        = true;
	usedExports            = false;
	concatenateModules     = true;

	portableRecords        = false;
	mangleExports          = false;
	// mangleExports          = 'deterministic';

	innerGraph             = true;
	realContentHash        = true;


	splitChunks = {
		chunks                 : 'all',
		minSize                : 30000,
		hidePathInfo           : false,
		maxAsyncRequests       : Infinity,
		maxInitialRequests     : Infinity,
		automaticNameDelimiter : '.',
		
		cacheGroups: {
			defaultVendors: {
				name     : 'app.vendor',
				test     : NODE_MODULE_REGEX,
				priority : -10
			},
			default: {
				minChunks          : 2,
				priority           : -20,
				reuseExistingChunk : true
			},
		},

	}
}

module.exports = WebpackOptimizations;