webpackJsonp([9,31],{10:function(t,n,e){function r(t,n){for(var e=0;e<t.length;e++){var r=t[e],o=h[r.id];if(o){o.refs++;for(var i=0;i<o.parts.length;i++)o.parts[i](r.parts[i]);for(;i<r.parts.length;i++)o.parts.push(f(r.parts[i],n))}else{for(var s=[],i=0;i<r.parts.length;i++)s.push(f(r.parts[i],n));h[r.id]={id:r.id,refs:1,parts:s}}}}function o(t,n){for(var e=[],r={},o=0;o<t.length;o++){var i=t[o],s=n.base?i[0]+n.base:i[0],a=i[1],c=i[2],u=i[3],f={css:a,media:c,sourceMap:u};r[s]?r[s].parts.push(f):e.push(r[s]={id:s,parts:[f]})}return e}function i(t,n){var e=b(t.insertInto);if(!e)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=x[x.length-1];if("top"===t.insertAt)r?r.nextSibling?e.insertBefore(n,r.nextSibling):e.appendChild(n):e.insertBefore(n,e.firstChild),x.push(n);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");e.appendChild(n)}}function s(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t);var n=x.indexOf(t);n>=0&&x.splice(n,1)}function a(t){var n=document.createElement("style");return t.attrs.type="text/css",u(n,t.attrs),i(t,n),n}function c(t){var n=document.createElement("link");return t.attrs.type="text/css",t.attrs.rel="stylesheet",u(n,t.attrs),i(t,n),n}function u(t,n){Object.keys(n).forEach(function(e){t.setAttribute(e,n[e])})}function f(t,n){var e,r,o,i;if(n.transform&&t.css){if(!(i=n.transform(t.css)))return function(){};t.css=i}if(n.singleton){var u=g++;e=m||(m=a(n)),r=l.bind(null,e,u,!1),o=l.bind(null,e,u,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(e=c(n),r=d.bind(null,e,n),o=function(){s(e),e.href&&URL.revokeObjectURL(e.href)}):(e=a(n),r=p.bind(null,e),o=function(){s(e)});return r(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;r(t=n)}else o()}}function l(t,n,e,r){var o=e?"":r.css;if(t.styleSheet)t.styleSheet.cssText=w(n,o);else{var i=document.createTextNode(o),s=t.childNodes;s[n]&&t.removeChild(s[n]),s.length?t.insertBefore(i,s[n]):t.appendChild(i)}}function p(t,n){var e=n.css,r=n.media;if(r&&t.setAttribute("media",r),t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}function d(t,n,e){var r=e.css,o=e.sourceMap,i=void 0===n.convertToAbsoluteUrls&&o;(n.convertToAbsoluteUrls||i)&&(r=y(r)),o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var s=new Blob([r],{type:"text/css"}),a=t.href;t.href=URL.createObjectURL(s),a&&URL.revokeObjectURL(a)}var h={},v=function(t){var n;return function(){return void 0===n&&(n=t.apply(this,arguments)),n}}(function(){return window&&document&&document.all&&!window.atob}),b=function(t){var n={};return function(e){return void 0===n[e]&&(n[e]=t.call(this,e)),n[e]}}(function(t){return document.querySelector(t)}),m=null,g=0,x=[],y=e(47);t.exports=function(t,n){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");n=n||{},n.attrs="object"==typeof n.attrs?n.attrs:{},n.singleton||(n.singleton=v()),n.insertInto||(n.insertInto="head"),n.insertAt||(n.insertAt="bottom");var e=o(t,n);return r(e,n),function(t){for(var i=[],s=0;s<e.length;s++){var a=e[s],c=h[a.id];c.refs--,i.push(c)}if(t){r(o(t,n),n)}for(var s=0;s<i.length;s++){var c=i[s];if(0===c.refs){for(var u=0;u<c.parts.length;u++)c.parts[u]();delete h[c.id]}}}};var w=function(){var t=[];return function(n,e){return t[n]=e,t.filter(Boolean).join("\n")}}()},120:function(t,n,e){var r=e(121);"string"==typeof r&&(r=[[t.i,r,""]]);var o={};o.transform=void 0;e(10)(r,o);r.locals&&(t.exports=r.locals)},121:function(t,n,e){n=t.exports=e(9)(void 0),n.push([t.i,"\n.flat-button,\n.raised-button {\n  border: 0;\n  color: #000;\n  font-size: 14px;\n  font-weight: medium;\n  height: 36px;\n  line-height: 36px;\n  margin: 6px 4px;\n  min-width: 72px;\n  outline: none;\n  padding: 0 8px;\n  text-decoration: none;\n  text-transform: uppercase;\n}\n.flat-button:hover,\n  .raised-button:hover {\n    background-color: rgba(153, 153, 153, 0.2);\n    text-decoration: none;\n}\n.raised-button {\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n  transition: box-shadow 200ms;\n}\n.raised-button:active {\n    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.3);\n}\n.flat-button {\n  float: right;\n}\n.icon-button:hover {\n  background-color: rgba(153, 153, 153, 0.2);\n  cursor: pointer;\n  transition: background-color 150ms;\n}\n",""])},122:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={props:{type:{type:String,default:"flat"},text:String},computed:{typeClass:function(){return this.type+"-button"}}}},123:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;return(t._self._c||n)("button",{class:["ripple",t.typeClass],on:{click:function(n){t.$emit("click")},mousedown:t._showRipple}},[t.text?[t._v("\n    "+t._s(t.text)+"\n  ")]:t._t("default")],2)},o=[];n.a={render:r,staticRenderFns:o}},14:function(t,n,e){"use strict";function r(t){e(120)}Object.defineProperty(n,"__esModule",{value:!0});var o=e(122),i=e.n(o),s=e(123),a=e(8),c=r,u=a(i.a,s.a,c,null,null);n.default=u.exports},213:function(t,n,e){var r=e(214);"string"==typeof r&&(r=[[t.i,r,""]]);var o={};o.transform=void 0;e(10)(r,o);r.locals&&(t.exports=r.locals)},214:function(t,n,e){n=t.exports=e(9)(void 0),n.push([t.i,"\n.service-actions {\n  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.37);\n  background-color: #fff;\n  bottom: 0;\n  display: inline-block;\n  height: 50px;\n  line-height: 50px;\n  position: absolute;\n  width: 100%;\n}\n.service-actions--button {\n    background-color: #fff;\n    margin-right: 16px;\n    pointer-events: auto;\n}\n",""])},215:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e(14),o=function(t){return t&&t.__esModule?t:{default:t}}(r);n.default={components:{vButton:o.default},props:{service:Object},computed:{components:function(){return JSON.parse(this.service.components)},wrapperStyling:function(){return{display:this.service.actions.length>0?"inline-block":"none",pointerEvents:this.service.actions.length>0?"initial":"none"}}},methods:{openUnread:function(){var t=this,n=[];this.components.forEach(function(e){var r=e.props.url;r&&n.push(t.findHistory(r))}),Promise.all(n).then(function(t){t.forEach(function(t){t&&window.open(t)})})},findHistory:function(t){return new Promise(function(n,e){chrome.history.getVisits({url:t},function(e){return n(0===e.length?t:!1)})})}}}},216:function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"service-actions",style:t.wrapperStyling},[t.service.actions.includes("openUnread")?e("v-button",{staticClass:"service-actions--button",attrs:{text:"Open unread",type:"flat"},on:{click:function(n){t.openUnread(t.service)}}}):t._e()],1)},o=[];n.a={render:r,staticRenderFns:o}},38:function(t,n,e){"use strict";function r(t){e(213)}Object.defineProperty(n,"__esModule",{value:!0});var o=e(215),i=e.n(o),s=e(216),a=e(8),c=r,u=a(i.a,s.a,c,null,null);n.default=u.exports},47:function(t,n){t.exports=function(t){var n="undefined"!=typeof window&&window.location;if(!n)throw new Error("fixUrls requires window.location");if(!t||"string"!=typeof t)return t;var e=n.protocol+"//"+n.host,r=e+n.pathname.replace(/\/[^\/]*$/,"/");return t.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(t,n){var o=n.trim().replace(/^"(.*)"$/,function(t,n){return n}).replace(/^'(.*)'$/,function(t,n){return n});if(/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(o))return t;var i;return i=0===o.indexOf("//")?o:0===o.indexOf("/")?e+o:r+o.replace(/^\.\//,""),"url("+JSON.stringify(i)+")"})}},8:function(t,n){t.exports=function(t,n,e,r,o){var i,s=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(i=t,s=t.default);var c="function"==typeof s?s.options:s;n&&(c.render=n.render,c.staticRenderFns=n.staticRenderFns),r&&(c._scopeId=r);var u;if(o?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},c._ssrRegister=u):e&&(u=e),u){var f=c.functional,l=f?c.render:c.beforeCreate;f?c.render=function(t,n){return u.call(n),l(t,n)}:c.beforeCreate=l?[].concat(l,u):[u]}return{esModule:i,exports:s,options:c}}},9:function(t,n){function e(t,n){var e=t[1]||"",o=t[3];if(!o)return e;if(n&&"function"==typeof btoa){var i=r(o);return[e].concat(o.sources.map(function(t){return"/*# sourceURL="+o.sourceRoot+t+" */"})).concat([i]).join("\n")}return[e].join("\n")}function r(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var n=[];return n.toString=function(){return this.map(function(n){var r=e(n,t);return n[2]?"@media "+n[2]+"{"+r+"}":r}).join("")},n.i=function(t,e){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&r[s[0]]||(e&&!s[2]?s[2]=e:e&&(s[2]="("+s[2]+") and ("+e+")"),n.push(s))}},n}}});