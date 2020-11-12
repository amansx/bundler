(self["webpackChunkexample"] = self["webpackChunkexample"] || []).push([["app"],{

/***/ "./app.tsx":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("./node_modules/react/index.js");
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("./node_modules/react-dom/index.js");
// EXTERNAL MODULE: ./node_modules/loglevel/lib/loglevel.js
var loglevel = __webpack_require__("./node_modules/loglevel/lib/loglevel.js");
var loglevel_default = /*#__PURE__*/__webpack_require__.n(loglevel);
// EXTERNAL MODULE: ./node_modules/loglevel-plugin-prefix/lib/loglevel-plugin-prefix.js
var loglevel_plugin_prefix = __webpack_require__("./node_modules/loglevel-plugin-prefix/lib/loglevel-plugin-prefix.js");
var loglevel_plugin_prefix_default = /*#__PURE__*/__webpack_require__.n(loglevel_plugin_prefix);
// CONCATENATED MODULE: ./analytics/openfin.ts
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var MODULE_NAME = "OpenfinAppAnalytics";
var OpenfinAnalyticsLogger = loglevel_default().getLogger(MODULE_NAME);
loglevel_plugin_prefix_default().reg((loglevel_default()));
loglevel_plugin_prefix_default().apply((loglevel_default()), {
  template: '[%t] %l (%n):',
  levelFormatter: function levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter: function nameFormatter(name) {
    return name || 'global';
  },
  timestampFormatter: function timestampFormatter(date) {
    return date.toISOString();
  }
});

var fn = function fn(level, name, timestamp) {
  return "[".concat(timestamp, "] ").concat(level, " (").concat(name, "):");
};

loglevel_plugin_prefix_default().apply(OpenfinAnalyticsLogger, {
  format: fn
});

var OpenfinAppAnalytics = function OpenfinAppAnalytics(upstreamHook) {
  var _this = this;

  _classCallCheck(this, OpenfinAppAnalytics);

  _defineProperty(this, "enable", function () {
    OpenfinAnalyticsLogger.setLevel(OpenfinAnalyticsLogger.levels.TRACE, false);
  });

  _defineProperty(this, "disable", function () {
    OpenfinAnalyticsLogger.disableAll(MODULE_NAME);
  });

  _defineProperty(this, "info", function () {
    for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _this.upstreamHook({
      MODULE_NAME: MODULE_NAME,
      ts: new Date(),
      data: data
    });

    OpenfinAnalyticsLogger.info.apply(OpenfinAnalyticsLogger, data);
  });

  _defineProperty(this, "debug", function () {
    OpenfinAnalyticsLogger.debug.apply(OpenfinAnalyticsLogger, arguments);
  });

  this.upstreamHook = upstreamHook;
  if (true) this.enable();

  if (typeof fin !== 'undefined') {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var app, win;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return fin.Application.getCurrent();

            case 2:
              app = _context.sent;
              _context.next = 5;
              return fin.Window.getCurrent();

            case 5:
              win = _context.sent;

              if (win.identity.name === app.identity.uuid) {
                app.on('window-closing', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-closed', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-crashed', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-created', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-end-load', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-hidden', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-initialized', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-start-load', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
                app.on('window-shown', function (e) {
                  OpenfinAnalyticsLogger.info(e);
                });
              }

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }
};


// CONCATENATED MODULE: ./analytics/transport.ts
function transport_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function transport_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var transport_MODULE_NAME = "TransportAnalytics";
var transportLogger = loglevel_default().getLogger(transport_MODULE_NAME);
loglevel_plugin_prefix_default().reg((loglevel_default()));
loglevel_plugin_prefix_default().apply((loglevel_default()), {
  template: '[%t] %l (%n):',
  levelFormatter: function levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter: function nameFormatter(name) {
    return name || 'global';
  },
  timestampFormatter: function timestampFormatter(date) {
    return date.toISOString();
  }
});

var transport_fn = function fn(level, name, timestamp) {
  return "[".concat(timestamp, "] ").concat(level, " (").concat(name, "):");
};

loglevel_plugin_prefix_default().apply(transportLogger, {
  format: transport_fn
});

var TransportAnalytics = function TransportAnalytics(upstreamHook) {
  var _this = this;

  transport_classCallCheck(this, TransportAnalytics);

  transport_defineProperty(this, "enable", function () {
    transportLogger.setLevel(transportLogger.levels.TRACE, false);
  });

  transport_defineProperty(this, "disable", function () {
    transportLogger.disableAll(transport_MODULE_NAME);
  });

  transport_defineProperty(this, "info", function () {
    for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _this.upstreamHook({
      MODULE_NAME: transport_MODULE_NAME,
      ts: new Date(),
      data: data
    });

    transportLogger.info.apply(transportLogger, data);
  });

  transport_defineProperty(this, "debug", function () {
    transportLogger.debug.apply(transportLogger, arguments);
  });

  this.upstreamHook = upstreamHook;
  if (true) this.enable();
};


// CONCATENATED MODULE: ./analytics/window.ts
function window_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function window_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var dclhandler = false;

var domAnalyticsHook = function domAnalyticsHook(instance) {
  if (dclhandler) {
    document.removeEventListener('DOMContentLoaded', start);
  }

  instance.info("DOM load complete");
};

var windowAnalyticsHook = function windowAnalyticsHook(instance) {
  instance.info("Window load complete");
};

var window_MODULE_NAME = "WindowAnalytics";
var windowLogger = loglevel_default().getLogger(window_MODULE_NAME);
loglevel_plugin_prefix_default().reg((loglevel_default()));
loglevel_plugin_prefix_default().apply((loglevel_default()), {
  template: '[%t] %l (%n):',
  levelFormatter: function levelFormatter(level) {
    return level.toUpperCase();
  },
  nameFormatter: function nameFormatter(name) {
    return name || 'global';
  },
  timestampFormatter: function timestampFormatter(date) {
    return date.toISOString();
  }
});

var window_fn = function fn(level, name, timestamp) {
  return "[".concat(timestamp, "] ").concat(level, " (").concat(name, "):");
};

loglevel_plugin_prefix_default().apply(windowLogger, {
  format: window_fn
});

var WindowAnalytics = function WindowAnalytics(upstreamHook) {
  var _this = this;

  window_classCallCheck(this, WindowAnalytics);

  window_defineProperty(this, "enable", function () {
    windowLogger.setLevel(windowLogger.levels.TRACE, false);
  });

  window_defineProperty(this, "disable", function () {
    windowLogger.disableAll(window_MODULE_NAME);
  });

  window_defineProperty(this, "info", function () {
    for (var _len = arguments.length, data = new Array(_len), _key = 0; _key < _len; _key++) {
      data[_key] = arguments[_key];
    }

    _this.upstreamHook({
      MODULE_NAME: window_MODULE_NAME,
      ts: new Date(),
      data: data
    });

    windowLogger.info.apply(windowLogger, data);
  });

  window_defineProperty(this, "debug", function () {
    windowLogger.debug.apply(windowLogger, arguments);
  });

  this.upstreamHook = upstreamHook;
  if (true) this.enable();
  if (window) window.addEventListener("load", function () {
    return windowAnalyticsHook(_this);
  });

  if (document) {
    if (document.readyState !== 'loading') {
      domAnalyticsHook(this);
    } else {
      dclhandler = true;
      document.addEventListener('DOMContentLoaded', start);
    }
  }
};


// CONCATENATED MODULE: ./analytics/index.ts
function analytics_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function analytics_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var Analytics = function Analytics(upstreamHook) {
  var _this = this;

  analytics_classCallCheck(this, Analytics);

  analytics_defineProperty(this, "openfin", function () {
    return _this.openfinAppAnalytics;
  });

  analytics_defineProperty(this, "transport", function () {
    return _this.transportAnalytics;
  });

  analytics_defineProperty(this, "window", function () {
    return _this.windowAnalytics;
  });

  if (window) window.Analytics = this;
  this.upstreamHook = upstreamHook;
  this.windowAnalytics = new WindowAnalytics(this.upstreamHook);
  this.transportAnalytics = new TransportAnalytics(this.upstreamHook);
  this.openfinAppAnalytics = new OpenfinAppAnalytics(this.upstreamHook);
};


// CONCATENATED MODULE: ./app.tsx
;


var app_Analytics = new Analytics(function (msg) {
  return console.log(msg);
});
setTimeout(function () {
  app_Analytics.transport().info("Hello world 11%s", "aman");
  app_Analytics.transport().debug("Hello world 22%s", "aman");
}, 2000);
react_dom.render( /*#__PURE__*/react.createElement("h1", null, "Hello World"), document.getElementById("app"));

/***/ })

},
0,[["./app.tsx","app.runtime","app.vendor"]]]);