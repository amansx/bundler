const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLTemplate = ({htmlWebpackPlugin}) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'meta').join('\n  ')}
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'link').join('\n  ')}
</head>
<body>
  <section id="app"></section>
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'script').join('\n  ')}
</body>
</html>`;

class PluginGenerateMarkup {

	constructor(deps) {
		this.webpack = deps.webpackBundler;
	}

	init() {
		this.webpack.plugins().append(new HtmlWebpackPlugin({
			filename        : 'index.htm',
			meta            : { 
				'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no' 
			},
			inject          : false,
			templateContent : HTMLTemplate,
		}))
	}

}

module.exports = PluginGenerateMarkup;