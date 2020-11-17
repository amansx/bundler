const REGEX_REACT_TYPESCRIPT = /\.tsx?$/

class RuleReactTypescript {
	use     = {
		loader  : "babel-loader",
		options : {
			presets: [
				'@babel/preset-env',
				'@babel/preset-react',
				'@babel/preset-typescript'
			],
			plugins: [
				'@babel/plugin-proposal-class-properties',
			]
		}
	};
	test    = REGEX_REACT_TYPESCRIPT;
	exclude = /node_modules/;
}

module.exports = RuleReactTypescript;