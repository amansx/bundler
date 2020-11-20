const path                   = require('path');
const _                      = require('lodash');
const postcssImport          = require('postcss-import');
const postcssNested          = require('postcss-nested');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssVariables       = require('postcss-css-variables');
const postcssRhythm          = require('@mgsisk/postcss-modular-rhythm');
const postcssPercentage      = require('postcss-percentage');
const postcssMath            = require('postcss-math');
const postcssAutoprefixer    = require('autoprefixer');
const postcssPrefixer        = require('postcss-prefix-selector');

const MiniCssExtractPlugin   = require('mini-css-extract-plugin');

const THEME_FILENAME_REGEX = /theme__([a-zA-Z0-9]*)\.css$/g;
const prefixer = (themeName) => {
	return postcssPrefixer({ 
		prefix    : 'body.theme--'+themeName,
		transform : (prefix, selector, prefixedSelector) => {
			switch (selector) {
				case 'html':
				case 'body':
					return selector + prefix;
					break;
				default:
					return prefixedSelector;
					break;
			}
		}
	})
}

class PostCSSPlugin {

	constructor(deps) {
		this.webpack = deps.webpackBundler;
		this.SRC_DIR = deps.SRC_DIR;
	}

	init() {

		this.webpack.resolve().ext('.css');
		const rule = this.webpack.module().rules().new()
		
		rule.
			test(/\.css$/).
			new().
				loader(MiniCssExtractPlugin.loader).
				setOptions({
					esModule: true,
					modules: {
						namedExport: true,
					}
				}).

			new().
				loader('css-loader').
				setOptions({
					esModule: true,
					modules: {
						namedExport: true,
						localIdentName: '[name]__[local]',
					},
				}).

			new().
				loader('postcss-loader').
				setOptions({
					postcssOptions: (ctx) => {
						const res       = ctx.resourcePath;
						const theme     = THEME_FILENAME_REGEX.exec(res);
						const themeName = _.get(theme, '[1]', false);
						const _plugins  = [];

						_plugins.push(postcssImport({ path: this.SRC_DIR }))
						_plugins.push(postcssNested())
						_plugins.push(postcssCustomSelectors())
						// _plugins.push(postcssRhythm())
						_plugins.push(postcssPercentage())
						_plugins.push(postcssMath())
						_plugins.push(postcssAutoprefixer())

						if (themeName) _plugins.push(prefixer(themeName))

						return {
							parser  : 'postcss-safe-parser',
							plugins : _plugins
						}
					}
				}).

		commit()

		this.webpack.plugins().append(
			new MiniCssExtractPlugin({ filename: 'styles/[name].css' }),
		)

	}


}


module.exports = PostCSSPlugin