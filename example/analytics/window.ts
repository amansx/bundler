import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

let dclhandler = false;

const domAnalyticsHook = (instance) => {
	if (dclhandler) { document.removeEventListener('DOMContentLoaded', start); }
	instance.info("DOM load complete")
}

const windowAnalyticsHook = (instance) => {
	instance.info("Window load complete")
}

const MODULE_NAME = "WindowAnalytics"
const windowLogger = logger.getLogger(MODULE_NAME);

prefix.reg(logger);
prefix.apply(logger, {
	template: '[%t] %l (%n):',
	levelFormatter(level) {
		return level.toUpperCase();
	},
	nameFormatter(name) {
		return name || 'global';
	},
	timestampFormatter(date) {
		return date.toISOString();
	},
});

const fn = (level, name, timestamp) => `[${timestamp}] ${level} (${name}):`;
prefix.apply(windowLogger, { format: fn });

export default class WindowAnalytics {
	enable = (...data) => {
		windowLogger.setLevel(windowLogger.levels.TRACE, false);
	}
	disable = (...data) => {
		windowLogger.disableAll(MODULE_NAME);
	}
	info = (...data) => {
		this.upstreamHook({
			MODULE_NAME,
			ts: new Date(),
			data
		});
		windowLogger.info(...data)
	}
	debug = (...data) => {
		windowLogger.debug(...data)
	}
	constructor(upstreamHook) {
		this.upstreamHook = upstreamHook;
		if (process.env.NODE_ENV === "development") this.enable();
		if (window) window.addEventListener("load", () => windowAnalyticsHook(this))
		if (document) {
			if (document.readyState !== 'loading') {
				domAnalyticsHook(this);
			} else {
				dclhandler = true;
				document.addEventListener('DOMContentLoaded', start);
			}
		}
	}
}
