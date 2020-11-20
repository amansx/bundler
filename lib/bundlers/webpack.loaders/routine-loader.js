const path = require('path');
const slash = require('slash');
const loaderUtils = require('loader-utils');

// Saved in loader code
function loader (src) {
const returnModule = `
let exports = {};
import * as Comlink from 'comlink';
${src}
Comlink.expose(exports);
`
return returnModule;
}

loader.pitch = function(request, orequest, data) {
const options = loaderUtils.getOptions(this) || {};
if (options.package) return;

const lopts  = JSON.stringify({ "package": true });
const wopts  = JSON.stringify({ "inline" : 'no-fallback', "esModule": false });
const worker = JSON.stringify(`!worker-loader?${wopts}!routine-loader?${lopts}!${request}`);

const returnModule = `
import {wrap} from 'comlink';
const __worker = require(${worker});
const worker = wrap(new __worker());
export default worker;
`;
return returnModule;
	
}

module.exports = loader;