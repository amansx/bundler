const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLTemplate = ({htmlWebpackPlugin}) => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'meta').join('\n  ') }
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'link').join('\n  ')}
</head>
<body>
<section id="app"></section>
  ${htmlWebpackPlugin.tags.headTags.filter((tag) => tag.tagName === 'script').join('\n  ')}
</body>
</html>`;

module.exports = {
	HtmlWebpackPlugin,
	HTMLTemplate
}