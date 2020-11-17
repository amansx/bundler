class WebpackConfigOptmizationTerser {
	// new TerserPlugin({
	// 	cache: true,
	// 	parallel: true,
	// 	sourceMap: true,
	// 	terserOptions: {}
	// }),

}


class WebpackConfigOptmization {
	_minimizer = false

	splitChunks()  {}
	runtimeChunk() {}
	emitOnErrors() {}

	// 'natural' | 'named' | 'deterministic' | 'size'
	moduleIds() {
	}

	// 'natural' | 'named' | 'size' | 'total-size' | 'deterministic'
	chunkIds() {
	}

	mangleWasmImports() {}

	removeAvailableModules() {}
	flagIncludedChunks() {}
	occurrenceOrder() {}
	concatenateModules() {}


	// Production
	// 'deterministic' | 'size'
	mangleExports() {}
	realContentHash() {}
}

module.exports = WebpackConfigOptmization;