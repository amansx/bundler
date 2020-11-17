import OpenfinAppAnalytics from './openfin';
import TransportAnalytics from './transport';
import WindowAnalytics from './window';

export default class Analytics {
	constructor(upstreamHook) {
		if (window) window.Analytics = this
		this.upstreamHook        = upstreamHook;
		this.windowAnalytics     = new WindowAnalytics(this.upstreamHook)
		this.transportAnalytics  = new TransportAnalytics(this.upstreamHook)
		this.openfinAppAnalytics = new OpenfinAppAnalytics(this.upstreamHook)
	}
	openfin   = () => this.openfinAppAnalytics
	transport = () => this.transportAnalytics
	window    = () => this.windowAnalytics
}