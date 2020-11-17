class WebpackConfigOutput {

	_filename = '[name].js';

	constructor(bundler) {
		this._bundler = bundler
	}

	dir(...outpath) {
		this._path = this._bundler.dir(...outpath);
		return this;
	}
	
	cwd(...outpath) {
		this._path = this._bundler.cwd(...outpath);
		return this;
	}
	
	library(name) {
		this._lib = name;
		return this;
	}
	
	libraryTarget(name) {
		this._libTarget = name;
		return this;
	}

	libraryExport(name) {
		this._libExport = name;
		return this;
	}

	importFunctionName(name) {
		this._impFuncName = name;
		return this;
	}

	auxiliaryComment(comment) {
		this._auxComment = comment;
		return this;
	}

	filename(filename) {
		this._filename = filename;
		return this;
	}

	sourceMapFilename(name) {
		this._srcMapFilename = name;
		return this;
	}

	chunkFileName(filename) {
		this._chunkfilename = filename;
		return this;
	}
	
	assetModuleFilename(filename) {
		this._assetfilename = filename;
		return this;
	}
	
	hotUpdateChunkFilename(filename) {
		this._hotchunkfilename = filename;
		return this;
	}
	
	hotUpdateMainFilename(filename) {
		this._hotMainfilename = filename;
		return this;
	}
	
	globalObject(globObj) {
		this._globObj = globObj;
		return this;
	}

	scriptType(scrType) {
		this._scrType = scrType;
		return this;
	}
	
	setPathInfo(pinfo) {
		this._pathinfo = pinfo;
		return this;
	}

	publicPath(pubPath) {
		this._publicPath = pubPath;
		return this;
	}

	setDefaults(filename) {
		switch (process.env.NODE_ENV) {
			case 'debug':
				this.dir('dist');
				this.setPathInfo(true);
				this.filename('scripts/[name].js');
				this.assetModuleFilename('assets/[ext]/[name].[ext]');
				this.hotUpdateChunkFilename('hot/[id]/[hash].js');
				this.hotUpdateMainFilename('hot/main/[hash].js');
				break;
			case 'development':
				this.dir('dist');
				this.filename('scripts/[name]/[contenthash].js');
				this.assetModuleFilename('assets/[ext]/[contenthash].[ext]');
				this.setPathInfo(true);
				break;
			default:
			case 'production':
				this.dir('dist');
				this.filename('scripts/[name]/[contenthash].js');
				this.assetModuleFilename('assets/[ext]/[contenthash].[ext]');
				this.setPathInfo(false);
				break;
		}
		return this._bundler;
	}

	config() {
		return {
			path                   : this._path,
			library                : this._lib,
			libraryTarget          : this._libTarget,
			libraryExport          : this._libExport,
			importFunctionName     : this._impFuncName,
			auxiliaryComment       : this._auxComment,
			filename               : this._filename,
			sourceMapFilename      : this._srcMapFilename,
			chunkFilename          : this._chunkFileName,
			assetModuleFilename    : this._assetfilename,
			hotUpdateChunkFilename : this._hotchunkfilename,
			hotUpdateMainFilename  : this._hotMainfilename,
			globalObject           : this._globObj,
			scriptType             : this._scrType,
			pathinfo               : this._pathinfo,
			publicPath             : this._publicPath,
		}
	}
	
}

module.exports = WebpackConfigOutput;