/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8080/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

window.onLoad = refreshServiceData();
var serviceDataRefreshDone;
var serviceData;

function refreshServiceData() {
  var localStorageHash = localStorage;

  serviceDataRefreshDone = new Promise(function (resolve, reject) {
    chrome.storage.sync.get(function (items) {
      serviceData = {
        spinner: "<div class='loader'><svg class='circular'><circle class='path'/></svg></div>",
        GC: {
          containerId: 'calendar',
          error: localStorageHash.Calendar_error || null,
          status: items.GC_status,
          alarmName: 'googleCalendar',
          refresh: isNaN(parseFloat(items.GC_refresh)) ? 15 : parseFloat(items.GC_refresh),
          bgFunctionName: 'getCalendarData',
          feFunctionName: 'calenderShowEvents',
          JSON: JSON.parse(localStorageHash.Calendar || null),
          HTML: localStorageHash.CalendarHTML || null,
          calendars: items.calendars,
          days: parseFloat(items.GC_days) || 6,
          panelWidth: parseFloat(items.GC_width) || 400,
          htmlStorageKey: 'CalendarHTML'
        },
        GM: {
          containerId: 'gmail',
          error: localStorageHash.Gmail_error || null,
          status: items.GM_status,
          alarmName: 'gmail',
          refresh: isNaN(parseFloat(items.GM_refresh)) ? 15 : parseFloat(items.GM_refresh),
          bgFunctionName: 'getGmailData',
          feFunctionName: 'GmailShowData',
          JSON: JSON.parse(localStorageHash.Gmail || null),
          ReadHTML: localStorageHash.GmailReadHTML || null,
          UnreadHTML: localStorageHash.GmailUnreadHTML || null,
          nextPage: localStorageHash.Gmail_page || null,
          panelWidth: parseFloat(items.GM_width) || 400,
          htmlStorageKey: ['GmailUnreadHTML', 'GmailReadHTML'],
          length: 25
        },
        CP: {
          containerId: 'couchpotato',
          status: items.CP_status,
          refresh: isNaN(parseFloat(items.CP_refresh)) ? 15 : parseFloat(items.CP_refresh),
          feFunctionName: 'cpShowData',
          address: items.CP_address,
          port: items.CP_port,
          key: items.CP_key,
          panelWidth: parseFloat(items.CP_width) || 400,
          htmlStorageKey: ['CouchpotatoSnatchedHTML', 'CouchpotatoWantedHTML'],
          snatched: {
            error: localStorageHash.CouchpotatoSnatched_error || null,
            alarmName: 'couchPotatoSnatched',
            bgFunctionName: 'getSnatchedCouchPotato',
            JSON: JSON.parse(localStorageHash.CouchpotatoSnatched || null),
            HTML: localStorageHash.CouchpotatoSnatchedHTML || null
          },
          wanted: {
            error: localStorageHash.CouchpotatoWanted_error || null,
            alarmName: 'couchPotatoWanted',
            bgFunctionName: 'getWantedCouchPotato',
            JSON: JSON.parse(localStorageHash.CouchpotatoWanted || null),
            HTML: localStorageHash.CouchpotatoWantedHTML || null,
            length: 25
          }
        },
        SB: {
          containerId: 'sickbeard',
          error: localStorageHash.Sickbeard_error || null,
          status: items.SB_status,
          alarmName: 'sickBeard',
          refresh: isNaN(parseFloat(items.SB_refresh)) ? 15 : parseFloat(items.SB_refresh),
          bgFunctionName: 'getSickBeardData',
          feFunctionName: 'sbShowData',
          JSON: JSON.parse(localStorageHash.Sickbeard || null),
          MissedHTML: localStorageHash.SickbeardMissedHTML || null,
          TodayHTML: localStorageHash.SickbeardTodayHTML || null,
          SoonHTML: localStorageHash.SickbeardSoonHTML || null,
          LaterHTML: localStorageHash.SickbeardLaterHTML || null,
          address: items.SB_address,
          port: items.SB_port,
          key: items.SB_key,
          panelWidth: parseFloat(items.SB_width) || 400,
          htmlStorageKey: ['SickbeardMissedHTML', 'SickbeardTodayHTML', 'SickbeardSoonHTML', 'SickbeardLaterHTML']
        },
        SAB: {
          containerId: 'sabnzbd',
          status: items.SAB_status,
          feFunctionName: 'sabShowData',
          downloadStatus: localStorageHash.SabnzbdStatusHTML || null,
          address: items.SAB_address,
          port: items.SAB_port,
          key: items.SAB_key,
          panelWidth: parseFloat(items.SAB_width) || 400,
          htmlStorageKey: ['SabnzbdQueueHTML', 'SabnzbdHistoryHTML'],
          queue: {
            error: localStorageHash.SabnzbdQueue_error || null,
            alarmName: 'sabnzbdQueue',
            refresh: isNaN(parseFloat(items.SABQ_refresh)) ? 15 : parseFloat(items.SABQ_refresh),
            bgFunctionName: 'getSabnzbdQueue',
            JSON: JSON.parse(localStorageHash.SabnzbdQueue || null),
            HTML: localStorageHash.SabnzbdQueueHTML || null
          },
          history: {
            error: localStorageHash.SabnzbdHistory_error || null,
            alarmName: 'sabnzbdHistory',
            refresh: isNaN(parseFloat(items.SABH_refresh)) ? 15 : parseFloat(items.SABH_refresh),
            bgFunctionName: 'getSabnzbdHistory',
            JSON: JSON.parse(localStorageHash.SabnzbdHistory || null),
            HTML: localStorageHash.SabnzbdHistoryHTML || null,
            length: items.SAB_history
          }
        },
        DN: {
          containerId: 'designernews',
          error: localStorageHash.Designernews_error || null,
          status: items.DN_status,
          alarmName: 'designerNews',
          refresh: isNaN(parseFloat(items.DN_refresh)) ? 15 : parseFloat(items.DN_refresh),
          bgFunctionName: 'getDesignerNewsData',
          feFunctionName: 'dnShowData',
          JSON: JSON.parse(localStorageHash.Designernews || null),
          HTML: localStorageHash.DesignernewsHTML || null,
          panelWidth: parseFloat(items.DN_width) || 400,
          htmlStorageKey: 'DesignernewsHTML'
        },
        HN: {
          containerId: 'hackernews',
          error: localStorageHash.Hackernews_error || null,
          status: items.HN_status,
          alarmName: 'hackernews',
          refresh: isNaN(parseFloat(items.HN_refresh)) ? 15 : parseFloat(items.HN_refresh),
          bgFunctionName: 'getHackerNewsData',
          feFunctionName: 'hnShowData',
          IDs: localStorageHash.HackernewsIDs || null,
          JSON: JSON.parse(localStorageHash.Hackernews || null),
          HTML: localStorageHash.HackernewsHTML || null,
          panelWidth: parseFloat(items.HN_width) || 400,
          htmlStorageKey: 'HackernewsHTML'
        },
        GH: {
          containerId: 'github',
          error: localStorageHash.Github_error || null,
          status: items.GH_status,
          alarmName: 'github',
          refresh: isNaN(parseFloat(items.GH_refresh)) ? 15 : parseFloat(items.GH_refresh),
          bgFunctionName: 'getGithubData',
          feFunctionName: 'ghShowData',
          JSON: localStorageHash.Github || null,
          HTML: localStorageHash.GithubHTML || null,
          panelWidth: parseFloat(items.GH_width) || 400,
          htmlStorageKey: 'GithubHTML'
        },
        PH: {
          containerId: 'producthunt',
          error: localStorageHash.ProductHunt_error || null,
          status: items.PH_status,
          alarmName: 'productHunt',
          refresh: isNaN(parseFloat(items.PH_refresh)) ? 15 : parseFloat(items.PH_refresh),
          bgFunctionName: 'getProductHuntData',
          feFunctionName: 'phShowData',
          JSON: JSON.parse(localStorageHash.ProductHunt || null),
          HTML: localStorageHash.ProductHuntHTML || null,
          panelWidth: parseFloat(items.PH_width) || 400,
          htmlStorageKey: 'ProductHuntHTML'
        },
        DR: {
          containerId: 'dribbble',
          error: localStorageHash.Dribbble_error || null,
          status: items.PH_status,
          alarmName: 'dribbble',
          refresh: isNaN(parseFloat(items.DR_refresh)) ? 15 : parseFloat(items.DR_refresh),
          bgFunctionName: 'getDribbbleData',
          feFunctionName: 'drShowData',
          JSON: JSON.parse(localStorageHash.Dribbble || null),
          HTML: localStorageHash.DribbbleHTML || null,
          smallImages: items.DR_small_images,
          gifs: items.DR_gifs,
          panelWidth: parseFloat(items.DR_width) || 400,
          htmlStorageKey: 'DribbbleHTML'
        },
        RD: {
          containerId: 'reddit',
          error: localStorageHash.Reddit_error || null,
          status: items.RD_status,
          alarmName: 'reddit',
          refresh: isNaN(parseFloat(items.RD_refresh)) ? 15 : parseFloat(items.RD_refresh),
          bgFunctionName: 'getRedditData',
          feFunctionName: 'rdShowData',
          JSON: JSON.parse(localStorageHash.Reddit || null),
          HTML: localStorageHash.RedditHTML || null,
          panelWidth: parseFloat(items.RD_width) || 400,
          subreddit: items.RD_subreddit || 'all',
          sorting: items.RD_sorting || 'Hot',
          htmlStorageKey: 'RedditHTML'
        },
        NG: {
          containerId: 'nzbget',
          status: items.NG_status,
          feFunctionName: 'ngShowData',
          downloadStatus: localStorageHash.NzbgetStatusHTML || null,
          address: items.NG_address,
          port: items.NG_port,
          username: items.NG_username,
          password: items.NG_password,
          panelWidth: parseFloat(items.NG_width) || 400,
          htmlStorageKey: ['NzbgetQueueHTML', 'NzbgetHistoryHTML'],
          queue: {
            error: localStorageHash.NzbgetQueue_error || null,
            alarmName: 'nzbgetQueue',
            refresh: isNaN(parseFloat(items.NGQ_refresh)) ? 15 : parseFloat(items.NGQ_refresh),
            bgFunctionName: 'getNzbgetQueue',
            JSON: JSON.parse(localStorageHash.NzbgetQueue || null),
            HTML: localStorageHash.NzbgetQueueHTML || null
          },
          history: {
            error: localStorageHash.NzbgetHistory_error || null,
            alarmName: 'nzbgetHistory',
            refresh: isNaN(parseFloat(items.NGH_refresh)) ? 15 : parseFloat(items.NGH_refresh),
            bgFunctionName: 'getNzbgetHistory',
            JSON: JSON.parse(localStorageHash.NzbgetHistory || null),
            HTML: localStorageHash.NzbgetHistoryHTML || null,
            length: parseFloat(items.NGH_length) || 25
          }
        },
        SO: {
          containerId: 'sonarr',
          error: localStorageHash.Sonarr_error || null,
          status: items.SO_status,
          alarmName: 'sonarr',
          refresh: isNaN(parseFloat(items.SO_refresh)) ? 15 : parseFloat(items.SO_refresh),
          bgFunctionName: 'getSonarrData',
          feFunctionName: 'soShowData',
          JSON: JSON.parse(localStorageHash.Sonarr || null),
          HTML: localStorageHash.SonarrHTML || null,
          address: items.SO_address,
          port: items.SO_port,
          key: items.SO_key,
          panelWidth: parseFloat(items.SO_width) || 400,
          htmlStorageKey: 'SonarrHTML'
        }
      };

      addApiUrls(serviceData);
      resolve(serviceData);
    });
  });
};

function addApiUrls(serviceData) {
  var cpUrl = serviceData.CP.address;
  if (serviceData.CP.port) {
    cpUrl += ":" + serviceData.CP.port;
  }
  serviceData.CP.url = cpUrl;
  cpUrl += "/api/" + serviceData.CP.key + "/";
  serviceData.CP.apiUrl = cpUrl;

  var sbUrl = serviceData.SB.address;
  if (serviceData.SB.port) {
    sbUrl += ":" + serviceData.SB.port;
  }
  serviceData.SB.url = sbUrl;
  sbUrl += "/api/" + serviceData.SB.key + "/";
  serviceData.SB.apiUrl = sbUrl;

  var sabUrl = serviceData.SAB.address;
  if (serviceData.SAB.port) {
    sabUrl += ":" + serviceData.SAB.port;
  }
  serviceData.SAB.url = sabUrl;
  sabUrl += "/sabnzbd/api?apikey=" + serviceData.SAB.key;
  serviceData.SAB.apiUrl = sabUrl;

  var ngUrl = serviceData.NG.address;
  if (serviceData.NG.port) {
    ngUrl += ":" + serviceData.NG.port;
  }
  serviceData.NG.url = ngUrl;
  ngUrl += "/" + serviceData.NG.username + ":" + serviceData.NG.password + "/jsonrpc", serviceData.NG.apiUrl = ngUrl;

  var soUrl = serviceData.SO.address;
  if (serviceData.SO.port) {
    soUrl += ":" + serviceData.SO.port;
  }
  serviceData.SO.url = soUrl;
  soUrl += "/api/";
  serviceData.SO.apiUrl = soUrl;
}

//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
  var objects = [];
  for (var i in obj) {
    if (obj[i] && !obj.hasOwnProperty(i)) continue;
    if (toString.call(obj[i]) == '[object Object]') {
      objects = objects.concat(getObjects(obj[i], key, val));
    }

    // if (toString.call(obj[i]) == '[object Array]') {
    //   console.log(obj[i]);
    //   console.log(obj[i].indexOf(val));
    // }
    if (i == key && obj[i] == val || i == key && !val) {
      objects.push(obj);
    } else if (toString.call(obj[i]) == '[object Array]' && obj[i].indexOf(val) > -1) {
      objects.push(obj);
    } else if (obj[i] == val && !key) {
      //only add if the object is not already in the array
      if (objects.lastIndexOf(obj) == -1) {
        objects.push(obj);
      }
    }
  }
  return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (_typeof(obj[i]) == 'object') {
      objects = objects.concat(getValues(obj[i], key));
    } else if (i == key) {
      objects.push(obj[i]);
    }
  }
  return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
  var objects = [];
  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    if (_typeof(obj[i]) == 'object') {
      objects = objects.concat(getKeys(obj[i], val));
    } else if (obj[i] == val) {
      objects.push(i);
    }
  }
  return objects;
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__(44);
var crossvent = __webpack_require__(45);
var classes = __webpack_require__(55);
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__(64);

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__(33);
var debounce = __webpack_require__(43);

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__(54);
var eventmap = __webpack_require__(46);
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(56)))

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65).setImmediate))

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(57);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _dragula = __webpack_require__(30);

var _dragula2 = _interopRequireDefault(_dragula);

var _serviceData = __webpack_require__(29);

var _serviceData2 = _interopRequireDefault(_serviceData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// serviceDataRefreshDone.then(function() {
// Restore options
restore_options();

// Drag services in sidebar
(0, _dragula2.default)([document.getElementById('services-menu')], {
  moves: function moves(el, container, handle) {
    return handle.className === 'drag-handle';
  },
  direction: 'vertical'
}).on('dragend', function (el, container, source) {
  var serviceOrder = [];
  var menuLinks = document.querySelectorAll('.options-menu-link');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = menuLinks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      var serviceId = el.getAttribute('data-service-id');
      if (serviceId) {
        serviceOrder.push(serviceId);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  localStorage.setItem('serviceOrder', serviceOrder);
});

// Sort services in menu on page load
var serviceOrder = localStorage.getItem('serviceOrder');
if (serviceOrder) {
  var serviceOrder = serviceOrder.split(',');
  var menu = document.querySelector('#services-menu');
  var serviceHTML;

  serviceOrder.forEach(function (val, index) {
    serviceHTML = menu.querySelector('[data-service-id="' + val + '"]');
    if (serviceHTML) {
      menu.appendChild(serviceHTML);
    }
  });
}

// Responsive menu
document.querySelector('.options-menu-icon').addEventListener('click', function () {
  var menu = document.querySelector('.options-menu');
  if (menu.classList.contains('expanded')) {
    menu.classList.remove('expanded');
  } else {
    menu.classList.add('expanded');
  }
});

// Change view when clicked on object in menu
var menuLinks = document.querySelectorAll('.options-menu-link');
var _iteratorNormalCompletion2 = true;
var _didIteratorError2 = false;
var _iteratorError2 = undefined;

try {
  for (var _iterator2 = menuLinks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
    var menuLink = _step2.value;

    menuLink.addEventListener('click', switchOptionsView);
  }

  // Link to hash page
} catch (err) {
  _didIteratorError2 = true;
  _iteratorError2 = err;
} finally {
  try {
    if (!_iteratorNormalCompletion2 && _iterator2.return) {
      _iterator2.return();
    }
  } finally {
    if (_didIteratorError2) {
      throw _iteratorError2;
    }
  }
}

if (location.hash) {
  var serviceName = location.hash.split('#')[1].toLowerCase();
  document.querySelector('.options-menu-link[data-lowTitle="' + serviceName + '"]').click();
}

// Build list of calendars
document.querySelector('.calendar-loading').innerHTML = _serviceData2.default.spinner;

chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
  var url = "https://www.googleapis.com/calendar/v3/users/me/calendarList?oauth_token=" + token;
  var checkboxContainer = document.querySelector('.calendar-select-container');
  var events = "";

  ajax('GET', url).then(function (data) {
    document.querySelector('.calendar-loading').style.display = 'none';

    var calendarsStorage = _serviceData2.default.GC.calendars;
    var checked;

    data.items.forEach(function (calendar) {
      checked = calendarsStorage.indexOf(calendar.id) > -1;
      checkboxContainer.insertAdjacentHTML('beforeend', checkboxTemplate(calendar, checked));
    });

    createEventListeners();
  }, function (error) {
    console.log(error);
    document.querySelector('.calendar-loading').style.display = 'none';
    checkboxContainer.insertAdjacentHTML('beforeend', '<div>' + '<div class="error-icon"></div>' + '<p>' + 'Failed to connect to Google Calendar check your connection and refresh.' + '</p>' + '</div>');

    createEventListeners();
  });
});

// });

function createEventListeners() {
  // Save options on change of fields
  var inputs = document.querySelectorAll('input');
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = inputs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var input = _step3.value;

      input.addEventListener('change', saveOptions);
    }

    // Switch change function
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var switches = document.querySelectorAll('.switch input[type=checkbox]');
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = switches[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var serviceSwitch = _step4.value;

      serviceSwitch.addEventListener('change', saveStatusOptions);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4.return) {
        _iterator4.return();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }
}

function checkboxTemplate(calendar, checked) {
  return "<div class='calendar-checkbox checkbox-container'>" + "<input type='checkbox' value='" + calendar.id + "' id='checkbox-" + calendar.id + "' class='checkbox-actual'" + (checked ? " checked" : "") + ">" + "<label for='checkbox-" + calendar.id + "'class='checkbox-label'>" + "<div class='checkbox'>" + "<div class='checkbox-mark'></div>" + "</div>" + calendar.summary + "</label>" + "</div>";
}

function switchOptionsView(event) {
  var menuItem = event.target.closest('.options-menu-link');
  var serviceName = menuItem.getAttribute('data-title');
  var serviceColor = '#' + menuItem.getAttribute('data-color');
  var optionsWindows = document.querySelectorAll('.options-window');
  var menuLinks = document.querySelectorAll('.options-menu-link');

  document.querySelector('.options-menu').classList.remove('expanded');
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = optionsWindows[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var optionsWindow = _step5.value;

      optionsWindow.style.display = 'none';
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5.return) {
        _iterator5.return();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  document.querySelector('.' + serviceName).style.display = 'block';
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = menuLinks[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var menuLink = _step6.value;

      menuLink.classList.remove('active');
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6.return) {
        _iterator6.return();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  menuItem.classList.add('active');
  document.querySelector('.options-window-title').style.backgroundColor = serviceColor;
  document.querySelector('.options-window-title-text').innerHTML = serviceName;
  location.hash = '#' + serviceName.toLowerCase();
}

function saveStatusOptions() {
  var checkboxes = document.querySelectorAll('input[type=checkbox]');
  var hash = {};

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = checkboxes[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var checkbox = _step7.value;

      var checkboxName = checkbox.getAttribute('name');
      if (checkboxName && checkboxName.endsWith('_status')) {
        hash[checkboxName] = checkbox.checked;
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7.return) {
        _iterator7.return();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  chrome.storage.sync.set(hash, function () {
    refreshBackgroundServiceData().then(function (backgroundPage) {
      backgroundPage.createAlarms();
    });
  });
}

// Saves options to chrome.storage
function saveOptions() {
  var calendars = [];
  var checkboxes = document.querySelectorAll('.calendar-checkbox .checkbox-actual:checked');
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = checkboxes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var checkbox = _step8.value;

      calendars.push(checkbox.getAttribute('value'));
    }
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8.return) {
        _iterator8.return();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  var CP_address = formatUrl('CP-address');
  var SB_address = formatUrl('SB-address');
  var SAB_address = formatUrl('SAB-address');
  var NG_address = formatUrl('NG-address');
  var SO_address = formatUrl('SO-address');

  var hash = {
    calendars: calendars,
    DR_small_images: document.querySelector('.dr-small-images-checkbox').classList.contains('checked'),
    DR_gifs: document.querySelector('.dr-gif-checkbox').classList.contains('checked'),
    CP_address: CP_address,
    SB_address: SB_address,
    SAB_address: SAB_address,
    NG_address: NG_address,
    SO_address: SO_address
  };

  var inputs = document.querySelectorAll('input[type=text], input[type=password], input[type=number]'),
      value,
      id,
      key;
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = inputs[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var input = _step9.value;

      value = input.value;
      key = input.getAttribute('name');
      if (key && (typeof value !== 'undefined' || typeof value !== 'null')) {
        hash.key = value;
      }
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9.return) {
        _iterator9.return();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  chrome.storage.sync.set(hash, function () {
    chrome.runtime.getBackgroundPage(function (backgroundPage) {
      backgroundPage.refreshServiceData();
      backgroundPage.createAlarms();
    });

    var status = document.querySelector('.status');
    status.innerHTML = 'Options saved.';
    status.style.bottom = '16px';
    setTimeout(function () {
      status.style.bottom = '-48px';
      status.innerHTLM = '';
    }, 1000);
  });
}

function restore_options() {
  if (_serviceData2.default.GC.status) {
    document.querySelector('input[type=checkbox][name=GC_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GC-days').value = _serviceData2.default.GC.days;
  document.querySelector('#GC-width').value = _serviceData2.default.GC.panelWidth;
  document.querySelector('#GC-refresh').value = _serviceData2.default.GC.refresh;
  if (_serviceData2.default.GM.status) {
    document.querySelector('input[type=checkbox][name=GM_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GM-width').value = _serviceData2.default.GM.panelWidth;
  document.querySelector('#GM-refresh').value = _serviceData2.default.GM.refresh;
  if (_serviceData2.default.CP.status) {
    document.querySelector('input[type=checkbox][name=CP_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#CP-address').value = _serviceData2.default.CP.address;
  document.querySelector('#CP-port').value = _serviceData2.default.CP.port;
  document.querySelector('#CP-key').value = _serviceData2.default.CP.key;
  document.querySelector('#CP-width').value = _serviceData2.default.CP.panelWidth;
  document.querySelector('#CP-refresh').value = _serviceData2.default.CP.refresh;
  if (_serviceData2.default.SB.status) {
    document.querySelector('input[type=checkbox][name=SB_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SB-address').value = _serviceData2.default.SB.address;
  document.querySelector('#SB-port').value = _serviceData2.default.SB.port;
  document.querySelector('#SB-key').value = _serviceData2.default.SB.key;
  document.querySelector('#SB-width').value = _serviceData2.default.SB.panelWidth;
  document.querySelector('#SB-refresh').value = _serviceData2.default.SB.refresh;
  if (_serviceData2.default.SAB.status) {
    document.querySelector('input[type=checkbox][name=SAB_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SAB-address').value = _serviceData2.default.SAB.address;
  document.querySelector('#SAB-port').value = _serviceData2.default.SAB.port;
  document.querySelector('#SAB-key').value = _serviceData2.default.SAB.key;
  document.querySelector('#SAB-history').value = _serviceData2.default.SAB.history.length;
  document.querySelector('#SAB-width').value = _serviceData2.default.SAB.panelWidth;
  document.querySelector('#SABQ-refresh').value = _serviceData2.default.SAB.queue.refresh;
  document.querySelector('#SABH-refresh').value = _serviceData2.default.SAB.history.refresh;
  if (_serviceData2.default.DN.status) {
    document.querySelector('input[type=checkbox][name=DN_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#DN-width').value = _serviceData2.default.DN.panelWidth;
  document.querySelector('#DN-refresh').value = _serviceData2.default.DN.refresh;
  if (_serviceData2.default.HN.status) {
    document.querySelector('input[type=checkbox][name=HN_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#HN-width').value = _serviceData2.default.HN.panelWidth;
  document.querySelector('#HN-refresh').value = _serviceData2.default.HN.refresh;
  if (_serviceData2.default.GH.status) {
    document.querySelector('input[type=checkbox][name=GH_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#GH-width').value = _serviceData2.default.GH.panelWidth;
  document.querySelector('#GH-refresh').value = _serviceData2.default.GH.refresh;
  if (_serviceData2.default.PH.status) {
    document.querySelector('input[type=checkbox][name=PH_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#PH-width').value = _serviceData2.default.PH.panelWidth;
  document.querySelector('#PH-refresh').value = _serviceData2.default.PH.refresh;
  if (_serviceData2.default.DR.status) {
    document.querySelector('input[type=checkbox][name=DR_status]').setAttribute('checked', 'true');
  }
  if (_serviceData2.default.DR.smallImages) {
    document.querySelector('.dr-small-images-checkbox').classList.add('checked');
  }
  if (_serviceData2.default.DR.gifs) {
    document.querySelector('.dr-gif-checkbox').classList.add('checked');
  }
  document.querySelector('#DR-width').value = _serviceData2.default.DR.panelWidth;
  document.querySelector('#DR-refresh').value = _serviceData2.default.DR.refresh;
  if (_serviceData2.default.RD.status) {
    document.querySelector('input[type=checkbox][name=RD_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#RD-subreddit').value = _serviceData2.default.RD.subreddit;
  document.querySelector('#RD-sorting').value = _serviceData2.default.RD.sorting;
  document.querySelector('#RD-width').value = _serviceData2.default.RD.panelWidth;
  document.querySelector('#RD-refresh').value = _serviceData2.default.RD.refresh;
  if (_serviceData2.default.NG.status) {
    document.querySelector('input[type=checkbox][name=NG_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#NG-address').value = _serviceData2.default.NG.address;
  document.querySelector('#NG-port').value = _serviceData2.default.NG.port;
  document.querySelector('#NG-width').value = _serviceData2.default.NG.panelWidth;
  document.querySelector('#NGQ-refresh').value = _serviceData2.default.NG.queue.refresh;
  document.querySelector('#NGH-refresh').value = _serviceData2.default.NG.history.refresh;
  document.querySelector('#NGH-length').value = _serviceData2.default.NG.history.length;
  document.querySelector('#NG-username').value = _serviceData2.default.NG.username;
  document.querySelector('#NG-password').value = _serviceData2.default.NG.password;
  if (_serviceData2.default.SO.status) {
    document.querySelector('input[type=checkbox][name=SO_status]').setAttribute('checked', 'true');
  }
  document.querySelector('#SO-address').value = _serviceData2.default.SO.address;
  document.querySelector('#SO-port').value = _serviceData2.default.SO.port;
  document.querySelector('#SO-key').value = _serviceData2.default.SO.key;
  document.querySelector('#SO-width').value = _serviceData2.default.SO.panelWidth;
  document.querySelector('#SO-refresh').value = _serviceData2.default.SO.refresh;
}

function formatUrl(fieldname) {
  var inputField = document.querySelector('#' + fieldname);
  if (inputField.value.slice(0, 8) == "https://" || inputField.value.slice(0, 7) == "http://") {
    return inputField.value;
  } else {
    return "http://" + inputField.value;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=options.bundle.js.map