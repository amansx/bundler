import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';

const MODULE_NAME = "OpenfinAppAnalytics"
const OpenfinAnalyticsLogger = logger.getLogger(MODULE_NAME);

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
prefix.apply(OpenfinAnalyticsLogger, { format: fn });

export default class OpenfinAppAnalytics {
	enable = (...data) => {
		OpenfinAnalyticsLogger.setLevel(OpenfinAnalyticsLogger.levels.TRACE, false);
	}
	disable = (...data) => {
		OpenfinAnalyticsLogger.disableAll(MODULE_NAME);
	}
	info = (...data) => {
		this.upstreamHook({
			MODULE_NAME,
			ts: new Date(),
			data
		});
		OpenfinAnalyticsLogger.info(...data)
	}
	debug = (...data) => {
		OpenfinAnalyticsLogger.debug(...data)
	}
	constructor(upstreamHook) {
		this.upstreamHook = upstreamHook;
		if (process.env.NODE_ENV === "development") this.enable();
		if (typeof fin !== 'undefined') {
			(async () => {

				const app = await fin.Application.getCurrent();
				const win = await fin.Window.getCurrent();

				if (win.identity.name === app.identity.uuid) {

					app.on('window-closing',     (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-closed',      (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-crashed',     (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-created',     (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-end-load',    (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-hidden',      (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-initialized', (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-start-load',  (e) => { OpenfinAnalyticsLogger.info(e) })
					app.on('window-shown',       (e) => { OpenfinAnalyticsLogger.info(e) })

				}

			})()
		}



	}
}