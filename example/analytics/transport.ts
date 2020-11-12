import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

const MODULE_NAME = "TransportAnalytics"
const transportLogger = logger.getLogger(MODULE_NAME);

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
prefix.apply(transportLogger, { format: fn });

export default class TransportAnalytics {
	enable = (...data) => {
		transportLogger.setLevel(transportLogger.levels.TRACE, false);
	}
	disable = (...data) => {
		transportLogger.disableAll(MODULE_NAME);
	}
	info = (...data) => {
		this.upstreamHook({
			MODULE_NAME,
			ts: new Date(),
			data
		});
		transportLogger.info(...data)
	}
	debug = (...data) => {
		transportLogger.debug(...data)
	}
	constructor(upstreamHook) {
		this.upstreamHook = upstreamHook;
		if (process.env.NODE_ENV === "development") this.enable();
	}
}