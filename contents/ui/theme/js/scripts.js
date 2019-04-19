/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));

// CSSUA
var cssua=function(n,l,p){var q=/\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/,r=/([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g,s=/\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/,t=/\bsilk-accelerated=true\b/,u=/\bfluidapp\b/,v=/(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/,w=/(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/,
x=/(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/,k={parse:function(b,d){var a={};d&&(a.standalone=d);b=(""+b).toLowerCase();if(!b)return a;for(var c,e,g=b.split(/[()]/),f=0,k=g.length;f<k;f++)if(f%2){var m=g[f].split(";");c=0;for(e=m.length;c<e;c++)if(q.exec(m[c])){var h=RegExp.$1.split(" ").join("_"),l=RegExp.$2;if(!a[h]||parseFloat(a[h])<parseFloat(l))a[h]=l}}else if(m=g[f].match(r))for(c=0,e=m.length;c<e;c++)h=m[c].split(/[\/\s]+/),h.length&&"mozilla"!==h[0]&&(a[h[0].split(" ").join("_")]=h.slice(1).join("-"));
w.exec(b)?(a.mobile=RegExp.$1,s.exec(b)&&(delete a[a.mobile],a.blackberry=a.version||RegExp.$3||RegExp.$2||RegExp.$1,RegExp.$1?a.mobile="blackberry":"0.0.1"===a.version&&(a.blackberry="7.1.0.0"))):x.exec(b)?(a.game=RegExp.$1,c=a.game.split(" ").join("_"),a.version&&!a[c]&&(a[c]=a.version)):v.exec(b)&&(a.desktop=RegExp.$1);a.intel_mac_os_x?(a.mac_os_x=a.intel_mac_os_x.split("_").join("."),delete a.intel_mac_os_x):a.cpu_iphone_os?(a.ios=a.cpu_iphone_os.split("_").join("."),delete a.cpu_iphone_os):a.cpu_os?
(a.ios=a.cpu_os.split("_").join("."),delete a.cpu_os):"iphone"!==a.mobile||a.ios||(a.ios="1");a.opera&&a.version?(a.opera=a.version,delete a.blackberry):t.exec(b)?a.silk_accelerated=!0:u.exec(b)&&(a.fluidapp=a.version);a.edge&&(delete a.applewebkit,delete a.safari,delete a.chrome,delete a.android);if(a.applewebkit)a.webkit=a.applewebkit,delete a.applewebkit,a.opr&&(a.opera=a.opr,delete a.opr,delete a.chrome),a.safari&&(a.chrome||a.crios||a.fxios||a.opera||a.silk||a.fluidapp||a.phantomjs||a.mobile&&
!a.ios?(delete a.safari,a.vivaldi&&delete a.chrome):a.safari=a.version&&!a.rim_tablet_os?a.version:{419:"2.0.4",417:"2.0.3",416:"2.0.2",412:"2.0",312:"1.3",125:"1.2",85:"1.0"}[parseInt(a.safari,10)]||a.safari);else if(a.msie||a.trident)if(a.opera||(a.ie=a.msie||a.rv),delete a.msie,delete a.android,a.windows_phone_os)a.windows_phone=a.windows_phone_os,delete a.windows_phone_os;else{if("wpdesktop"===a.mobile||"xblwp7"===a.mobile||"zunewp7"===a.mobile)a.mobile="windows desktop",a.windows_phone=9>+a.ie?
"7.0":10>+a.ie?"7.5":"8.0",delete a.windows_nt}else if(a.gecko||a.firefox)a.gecko=a.rv;a.rv&&delete a.rv;a.version&&delete a.version;return a},format:function(b){var d="",a;for(a in b)if(a&&b.hasOwnProperty(a)){var c=a,e=b[a],c=c.split(".").join("-"),g=" ua-"+c;if("string"===typeof e){for(var e=e.split(" ").join("_").split(".").join("-"),f=e.indexOf("-");0<f;)g+=" ua-"+c+"-"+e.substring(0,f),f=e.indexOf("-",f+1);g+=" ua-"+c+"-"+e}d+=g}return d},encode:function(b){var d="",a;for(a in b)a&&b.hasOwnProperty(a)&&
(d&&(d+="\x26"),d+=encodeURIComponent(a)+"\x3d"+encodeURIComponent(b[a]));return d}};k.userAgent=k.ua=k.parse(l,p);l=k.format(k.ua)+" js";n.className=n.className?n.className.replace(/\bno-js\b/g,"")+l:l.substr(1);return k}(document.documentElement,navigator.userAgent,navigator.standalone);


/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssfilters-setclasses !*/
!function(e,n,t){function r(e,n){return typeof e===n}function s(){var e,n,t,s,o,i,l;for(var a in S)if(S.hasOwnProperty(a)){if(e=[],n=S[a],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=r(n.fn,"function")?n.fn():n.fn,o=0;o<e.length;o++)i=e[o],l=i.split("."),1===l.length?Modernizr[l[0]]=s:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=s),C.push((s?"":"no-")+l.join("-"))}}function o(e){var n=_.className,t=Modernizr._config.classPrefix||"";if(x&&(n=n.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(r,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),x?_.className.baseVal=n:_.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):x?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function l(e,n){return!!~(""+e).indexOf(n)}function a(e,n){return function(){return e.apply(n,arguments)}}function u(e,n,t){var s;for(var o in e)if(e[o]in n)return t===!1?e[o]:(s=n[e[o]],r(s,"function")?a(s,t||n):s);return!1}function f(e){return e.replace(/([a-z])-([a-z])/g,function(e,n,t){return n+t.toUpperCase()}).replace(/^-/,"")}function p(e){return e.replace(/([A-Z])/g,function(e,n){return"-"+n.toLowerCase()}).replace(/^ms-/,"-ms-")}function c(n,t,r){var s;if("getComputedStyle"in e){s=getComputedStyle.call(e,n,t);var o=e.console;if(null!==s)r&&(s=s.getPropertyValue(r));else if(o){var i=o.error?"error":"log";o[i].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else s=!t&&n.currentStyle&&n.currentStyle[r];return s}function d(){var e=n.body;return e||(e=i(x?"svg":"body"),e.fake=!0),e}function m(e,t,r,s){var o,l,a,u,f="modernizr",p=i("div"),c=d();if(parseInt(r,10))for(;r--;)a=i("div"),a.id=s?s[r]:f+(r+1),p.appendChild(a);return o=i("style"),o.type="text/css",o.id="s"+f,(c.fake?c:p).appendChild(o),c.appendChild(p),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(n.createTextNode(e)),p.id=f,c.fake&&(c.style.background="",c.style.overflow="hidden",u=_.style.overflow,_.style.overflow="hidden",_.appendChild(c)),l=t(p,e),c.fake?(c.parentNode.removeChild(c),_.style.overflow=u,_.offsetHeight):p.parentNode.removeChild(p),!!l}function y(n,r){var s=n.length;if("CSS"in e&&"supports"in e.CSS){for(;s--;)if(e.CSS.supports(p(n[s]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];s--;)o.push("("+p(n[s])+":"+r+")");return o=o.join(" or "),m("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==c(e,null,"position")})}return t}function v(e,n,s,o){function a(){p&&(delete k.style,delete k.modElem)}if(o=r(o,"undefined")?!1:o,!r(s,"undefined")){var u=y(e,s);if(!r(u,"undefined"))return u}for(var p,c,d,m,v,g=["modernizr","tspan","samp"];!k.style&&g.length;)p=!0,k.modElem=i(g.shift()),k.style=k.modElem.style;for(d=e.length,c=0;d>c;c++)if(m=e[c],v=k.style[m],l(m,"-")&&(m=f(m)),k.style[m]!==t){if(o||r(s,"undefined"))return a(),"pfx"==n?m:!0;try{k.style[m]=s}catch(h){}if(k.style[m]!=v)return a(),"pfx"==n?m:!0}return a(),!1}function g(e,n,t,s,o){var i=e.charAt(0).toUpperCase()+e.slice(1),l=(e+" "+N.join(i+" ")+i).split(" ");return r(n,"string")||r(n,"undefined")?v(l,n,s,o):(l=(e+" "+T.join(i+" ")+i).split(" "),u(l,n,t))}function h(e,n,r){return g(e,t,t,n,r)}var C=[],S=[],w={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){S.push({name:e,fn:n,options:t})},addAsyncTest:function(e){S.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=w,Modernizr=new Modernizr;var _=n.documentElement,x="svg"===_.nodeName.toLowerCase(),b=w._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];w._prefixes=b;var P="CSS"in e&&"supports"in e.CSS,z="supportsCSS"in e;Modernizr.addTest("supports",P||z);var E="Moz O ms Webkit",T=w._config.usePrefixes?E.toLowerCase().split(" "):[];w._domPrefixes=T;var N=w._config.usePrefixes?E.split(" "):[];w._cssomPrefixes=N;var j={elem:i("modernizr")};Modernizr._q.push(function(){delete j.elem});var k={style:j.elem.style};Modernizr._q.unshift(function(){delete k.style}),w.testAllProps=g,w.testAllProps=h,Modernizr.addTest("cssfilters",function(){if(Modernizr.supports)return h("filter","blur(2px)");var e=i("a");return e.style.cssText=b.join("filter:blur(2px); "),!!e.style.length&&(n.documentMode===t||n.documentMode>9)}),s(),o(C),delete w.addTest,delete w.addAsyncTest;for(var A=0;A<Modernizr._q.length;A++)Modernizr._q[A]();e.Modernizr=Modernizr}(window,document);


/*!
 * OverlayScrollbars
 * https://github.com/KingSora/OverlayScrollbars
 *
 * Version: 1.5.0
 *
 * Copyright KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 * Date: 21.06.2018
 */
!function(t,e){"function"==typeof define&&define.amd?define(["jquery"],function(n){return e(t,t.document,undefined,n)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=e(t,t.document,undefined,require("jquery")):e(t,t.document,undefined,t.jQuery)}("undefined"!=typeof window?window:this,function(t,e,n,r){"use strict";var i,o,a,s="OverlayScrollbars",c={o:"object",f:"function",a:"array",s:"string",b:"boolean",n:"number",u:"undefined",z:"null"},l={c:"class",s:"style",i:"id",l:"length",oH:"offsetHeight",cH:"clientHeight",sH:"scrollHeight",oW:"offsetWidth",cW:"clientWidth",sW:"scrollWidth"},u={wW:function(){return t.innerWidth||e.documentElement[l.cW]||e.body[l.cW]},wH:function(){return t.innerHeight||e.documentElement[l.cH]||e.body[l.cH]},mO:function(){return t.MutationObserver||t.WebKitMutationObserver||t.WebkitMutationObserver||t.MozMutationObserver||n},rO:function(){return t.ResizeObserver||t.WebKitResizeObserver||t.WebkitResizeObserver||t.MozResizeObserver||n},rAF:function(){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(e){return t.setTimeout(e,1e3/60)}},cAF:function(){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||t.oCancelAnimationFrame||t.msCancelAnimationFrame||function(e){return t.clearTimeout(e)}},now:function(){return Date.now()||(new Date).getTime()},stpP:function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},prvD:function(t){t.preventDefault&&t.cancelable?t.preventDefault():t.returnValue=!1},page:function(t){var r="page",i="client",o="X",a="Y",s=((t=t.originalEvent||t).target||t.srcElement||e).ownerDocument||e,c=s.documentElement,l=s.body;if(t.touches!==n){var u=t.touches[0];return{x:u[r+o],y:u[r+a]}}return!t[r+o]&&t[i+o]&&null!=t[i+o]?{x:t[i+o]+(c&&c.scrollLeft||l&&l.scrollLeft||0)-(c&&c.clientLeft||l&&l.clientLeft||0),y:t[i+a]+(c&&c.scrollTop||l&&l.scrollTop||0)-(c&&c.clientTop||l&&l.clientTop||0)}:{x:t[r+o],y:t[r+a]}},mBtn:function(t){return t.which||t.button===n?t.which:1&t.button?1:2&t.button?3:4&t.button?2:0},inA:function(t,e){for(var n=0;n<e[l.l];n++)try{if(e[n]===t)return n}catch(r){}return-1},bind:function(t,e){if(typeof t!=c.f)throw"Can't bind function!";var n=Array.prototype.slice.call(arguments,2),r=function(){},i=function(){return t.apply(this instanceof r?this:e,n.concat(Array.prototype.slice.call(arguments)))};return t.prototype&&(r.prototype=t.prototype),i.prototype=new r,i}},f=r,h=function(r,i,o){var a,u,h,d,v,p,y,x,m,w,b,g,S,O=[],z=(h=[c.b,c.n,c.s,c.a,c.o,c.f,c.z],d=" ",v=":",p=[c.z,c.s],y=c.b,x=c.n,m=[c.z,y],w=[c.z,c.f],g={className:["os-theme-dark",p],resize:["none","n:none b:both h:horizontal v:vertical"],sizeAutoCapable:[!0,y],clipAlways:[!0,y],normalizeRTL:[!0,y],paddingAbsolute:[!1,y],autoUpdate:[null,m],autoUpdateInterval:[33,x],nativeScrollbarsOverlaid:{showNativeScrollbars:[!1,y],initialize:[!0,y]},overflowBehavior:{x:["scroll",b="v-h:visible-hidden v-s:visible-scroll s:scroll h:hidden"],y:["scroll",b]},scrollbars:{visibility:["auto","v:visible h:hidden a:auto"],autoHide:["never","n:never s:scroll l:leave m:move"],autoHideDelay:[800,x],dragScrolling:[!0,y],clickScrolling:[!1,y],touchSupport:[!0,y]},textarea:{dynWidth:[!1,y],dynHeight:[!1,y]},callbacks:{onInitialized:[null,w],onInitializationWithdrawn:[null,w],onDestroyed:[null,w],onScrollStart:[null,w],onScroll:[null,w],onScrollStop:[null,w],onOverflowChanged:[null,w],onOverflowAmountChanged:[null,w],onDirectionChanged:[null,w],onContentSizeChanged:[null,w],onHostSizeChanged:[null,w],onUpdated:[null,w]}},{d:(S=function(t){var e=function(n){var i,o,a;for(i in n)n.hasOwnProperty(i)&&(o=n[i],(a=r.type(o))==c.a?n[i]=o[t?1:0]:a==c.o&&(n[i]=e(o)));return n};return e(r.extend(!0,{},g))})(),t:S(!0),v:function(t,e,n,i,o){var a={},s=r.extend(!0,{},t),l=function(t,e,o,a){for(var s in e)if(e.hasOwnProperty(s)&&t.hasOwnProperty(s)){var u,f,p,y,x,m,w,b,g=!1,S=e[s],O=r.type(S),z=r.type(S)!=c.a?[S]:S,M=t[s],W=r.type(M),H=a?a+".":"",A='The option "'+H+s+"\" wasn't set, because",C=[],T=[];if(O==c.o)o[s]={},l(M,S,o[s],H+s),r.isEmptyObject(M)&&delete t[s];else{for(m=0;m<z.length;m++)if(x=z[m],p=(O=r.type(x))==c.s&&-1===r.inArray(x,h))for(C.push(c.s),u=x.split(d),T=T.concat(u),w=0;w<u.length;w++){for(y=(f=u[w].split(v))[0],b=0;b<f.length;b++)if(M===f[b]){g=!0;break}if(g)break}else if(C.push(x),W===x){g=!0;break}g?o[s]=p&&i?y:M:n&&console.warn(A+" it doesn't accept the type [ "+W.toUpperCase()+' ] with the value of "'+M+'".\r\nAccepted types are: [ '+C.join(", ").toUpperCase()+" ]."+(T.length>0?"\r\nValid strings are: [ "+T.join(", ").split(v).join(", ")+" ].":"")),delete t[s]}}};return l(s,e,a),o?r.extend(!0,a,s):!r.isEmptyObject(s)&&n&&console.warn("The following options are discarded due to invalidity:\r\n"+JSON.stringify(s,null,2)),a}});function M(){a||(a=new W(z.d)),u||(u=new H(a))}function W(a){var s=this,c="overflow",u="hidden",f="scroll",h=r("body"),d=r('<div id="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>'),v=d[0],p=r(d.children("div").eq(0)),y=v[l.oH];h.append(d),0===y&&d.hide().show();var x,m,w,b,g,S,O,z,M,W=C(v),H={x:0===W.x,y:0===W.y};function A(t){var r=!1,i="Webkit Moz ms O".split(" "),o=e.createElement("div"),a=null,s=0;if(t=t.toLowerCase(),o[l.s][t]!==n&&(r=!0),!r)for(a=t.charAt(0).toUpperCase()+t.substr(1);s<i.length;s++)if(o[l.s][i[s]+a]!==n){r=!0;break}return r}function C(t){return{x:t[l.oH]-t[l.cH],y:t[l.oW]-t[l.cW]}}r.extend(s,{defaultOptions:a,autoUpdateLoop:!1,autoUpdateRecommended:!i.mO(),nativeScrollbarSize:W,nativeScrollbarIsOverlaid:H,nativeScrollbarStyling:(d.addClass("os-viewport-native-scrollbars-invisible"),d.css(c,u).hide().css(c,f).show(),v[l.oH]-v[l.cH]==0&&v[l.oW]-v[l.cW]==0),overlayScrollbarDummySize:{x:30,y:30},msie:(m=t.navigator.userAgent,w="indexOf",b="substring",g=m[w]("MSIE "),S=m[w]("Trident/"),O=m[w]("Edge/"),z=m[w]("rv:"),M=t.parseInt,g>0?x=M(m[b](g+5,m[w](".",g)),10):S>0?x=M(m[b](z+3,m[w](".",z)),10):O>0&&(x=M(m[b](O+5,m[w](".",O)),10)),x),cssCalc:function(){var t,n,r=e.createElement("div"),i=["calc","-webkit-calc","-moz-calc","-o-calc"];for(t=0;t<i.length;++t)if(n=i[t],r[l.s].cssText="width:"+n+"(1px);",r[l.s].length)return n;return null}(),restrictedMeasuring:function(){d.css(c,u);var t={w:v[l.sW],h:v[l.sH]};d.css(c,"visible");var e={w:v[l.sW],h:v[l.sH]};return t.w-e.w!=0||t.h-e.h!=0}(),rtlScrollBehavior:function(){d.css({"overflow-y":u,"overflow-x":f,direction:"rtl"}).scrollLeft(0);var t=d.offset(),e=p.offset();d.scrollLeft(999);var n=p.offset();return{i:t.left===e.left,n:e.left-n.left==0}}(),supportTransform:A("transform"),supportTransition:A("transition"),supportPassiveEvents:function(){var e=!1;try{t.addEventListener("test",null,Object.defineProperty({},"passive",{get:function(){e=!0}}))}catch(n){}return e}(),supportResizeObserver:!!i.rO(),supportMutationObserver:!!i.mO()}),d.removeAttr(l.s).remove(),function(){if(!H.x||!H.y){var e=i.wW(),n=i.wH(),a=u(),c=function(){if(o().length>0){var t=i.wW(),c=i.wH(),f=t-e,v=c-n;if(0===f&&0===v)return;var p,y=Math.round(t/(e/100)),x=Math.round(c/(n/100)),m=Math.abs(f),w=Math.abs(v),b=Math.abs(y),g=Math.abs(x),S=u(),O=m>2&&w>2,z=!l(b,g),M=O&&z&&(S!==a&&a>0),W=s.nativeScrollbarSize;M&&(h.append(d),p=s.nativeScrollbarSize=C(d[0]),d.remove(),W.x===p.x&&W.y===p.y||r.each(o(),function(){o(this)&&o(this).update("zoom")})),e=t,n=c,a=S}};r(t).on("resize",c)}function l(t,e){var n=Math.abs(t),r=Math.abs(e);return!(n===r||n+1===r||n-1===r)}function u(){var e=t.screen.deviceXDPI||0,n=t.screen.logicalXDPI||1;return t.devicePixelRatio||e/n}}()}function H(t){var e,o=this,a="autoUpdate",s=a+"Interval",c=[],l=[],u=!1,f=33,h=f,d=i.now(),v=function(){if(c.length>0&&u){e=i.rAF()(function(){v()});var t=i.now(),r=t-d;if(r>h){d=t-r%h;for(var o=f,p=0;p<c.length;p++){var y=c[p];if(y!==n){var x=y.options(),m=x[a],w=Math.max(1,x[s]),b=i.now();(!0===m||null===m)&&b-l[p]>w&&(y.update("auto"),l[p]=new Date(b+=w)),o=Math.max(1,Math.min(o,w))}}h=o}}else h=f};o.add=function(e){-1===r.inArray(e,c)&&(c.push(e),l.push(i.now()),c.length>0&&!u&&(u=!0,t.autoUpdateLoop=u,v()))},o.remove=function(o){var a=r.inArray(o,c);a>-1&&(l.splice(a,1),c.splice(a,1),0===c.length&&u&&(u=!1,t.autoUpdateLoop=u,e!==n&&(i.cAF()(e),e=-1)))}}function A(a,u,h,d,v){if(ui(a)){if(o(a)){var p=o(a);return p.options(u),p}var y,x,m,w,b,g,S,O,M,W,H,A,C,T,k,E,L,P,D,R,N,F,I,j,U,_,q,B,V,X,Y,K,J,Q,G,Z,$,tt,et,nt,rt,it,ot,at,st,ct,lt,ut,ft,ht,dt,vt,pt,yt,xt,mt,wt,bt,gt,St,Ot,zt,Mt,Wt,Ht,At,Ct,Tt,kt,Et,Lt,Pt,Dt,Rt,Nt,Ft,It,jt,Ut,_t,qt,Bt,Vt,Xt,Yt,Kt,Jt,Qt,Gt,Zt,$t,te,ee,ne,re,ie,oe,ae,se,ce,le,ue,fe,he,de,ve,pe,ye,xe,me,we,be,ge,Se,Oe,ze,Me,We,He,Ae,Ce,Te=new t[s],ke={},Ee={},Le={},Pe={},De={},Re=175,Ne="-hidden",Fe="margin-",Ie="padding-",je="border-",Ue="top",_e="right",qe="bottom",Be="left",Ve="min-",Xe="max-",Ye="width",Ke="height",Je="float",Qe="",Ge="auto",Ze="scroll",$e="100%",tn="x",en="y",nn=".",rn=" ",on="scrollbar",an="-horizontal",sn="-vertical",cn=Ze+"Left",ln=Ze+"Top",un="mousedown touchstart",fn="mouseup touchend touchcancel",hn="mousemove touchmove",dn="mouseenter",vn="mouseleave",pn="keydown",yn="keyup",xn="selectstart",mn="transitionend webkitTransitionEnd oTransitionEnd",wn="__overlayScrollbarsRO__",bn="os-",gn=bn+"html",Sn=bn+"host",On=Sn+"-textarea",zn=Sn+"-"+on+an+Ne,Mn=Sn+"-"+on+sn+Ne,Wn=Sn+"-transition",Hn=Sn+"-rtl",An=Sn+"-resize-disabled",Cn=Sn+"-scrolling",Tn=Sn+"-overflow",kn=Tn+"-x",En=Tn+"-y",Ln=bn+"textarea",Pn=Ln+"-cover",Dn=bn+"padding",Rn=bn+"viewport",Nn=Rn+"-native-scrollbars-invisible",Fn=Rn+"-native-scrollbars-overlaid",In=bn+"content",jn=bn+"content-arrange",Un=bn+"content-glue",_n=bn+"size-auto-observer",qn=bn+"resize-observer",Bn=bn+"resize-observer-item",Vn=Bn+"-final",Xn=bn+"text-inherit",Yn=bn+on,Kn=Yn+"-track",Jn=Kn+"-off",Qn=Yn+"-handle",Gn=Qn+"-off",Zn=Yn+"-unusable",$n=Yn+"-"+Ge+Ne,tr=Yn+"-corner",er=tr+"-resize",nr=er+"-both",rr=er+an,ir=er+sn,or=Yn+an,ar=Yn+sn,sr=bn+"dragging",cr=bn+"theme-none",lr={},ur="added removed on contract",fr={},hr=33,dr=[],vr=11,pr=[112,113,114,115,116,117,118,119,120,121,123,33,34,37,38,39,40,16,17,18,19,20,144],yr=[],xr={},mr={};if(Te.sleep=function(){B=!0},Te.update=function(t){var e,n,o="zoom"===t,a="img",s="load";t===Ge?(e=Jr(),n=Kr(),(e||n)&&Zr(!1,n)):o?Zr(!0,!0):(t=B||t,B=!1,Zr(!1,!1,t)),E||o||lt.find(a).each(function(t,e){-1===i.inA(e,dr)&&(e=r(e)).off(s,Br).on(s,Br)})},Te.options=function(t,e){if(r.isEmptyObject(t)||!r.isPlainObject(t)){if(Oi(t)==c.s){if(arguments.length>=2){var n={};return wi(n,t,e),$r(n),void Zr()}return mi(Y,t)}return Y}$r(t);var i=B||!1;B=!1,Zr(),B=i},Te.destroy=function(){for(var t in k=!0,v.remove(Te),Wr(),Sr(it),R&&Sr(rt),lr)Te.removeExt(t);Hi(it),ot!==n&&Hi(ot),ct!==n&&Hi(ct),R&&Hi(rt),H?(br(nt,hn,Tr),br(nt,dn,Ar),br(nt,vn,Cr)):nt.off(hn,Tr).off(dn,Ar).off(vn,Cr),Hi(ht),Hi(pt),ft&&Hi(ft),We||_r(),lt.contents().unwrap().unwrap().unwrap(),L&&Wi($,gn),E?(et.off(Ze,Ir).off("drop",Rr).off("focus",Nr).off("focusout",Fr),b>9||!w?et.off("input",Lr):et.off(pn,Pr).off(yn,Dr),Hi(ut),Wi(et,Ln+rn+Xn).unwrap().removeAttr(l.s),Hi(nt)):(Wi(et,Sn),Wi(nt,[Sn,An,Hn,zn,Mn,Wn,Cn,Tn,kn,En,cr,re].join(rn)));for(var e=0;e<dr.length;e++)r(dr[e]).off("load",Br);for(var i in dr=n,o(a,0),ci("onDestroyed"),Te)delete Te[i];Te=n},Te.scroll=function(e,i,o,a){if(0===arguments.length||e===n){var s=Ee,u=Le,h=ne&&q&&m.i,d=ne&&q&&m.n,v=s.cs,p=s.csr,y=s.ms;return v=h?y-v:v,{x:{position:v*=d?-1:1,ratio:p=h?1-p:p,max:y*=d?-1:1,handleOffset:s.ho,handleLength:s.hl,handleLengthRatio:s.hlr,trackLength:s.tl,isRTL:q,isRTLNormalized:ne},y:{position:u.cs,ratio:u.csr,max:u.ms,handleOffset:u.ho,handleLength:u.hl,handleLengthRatio:u.hlr,trackLength:u.tl}}}var x,w,b,g,S,O,z,M,H,A=ne,C=[tn,Be,"l"],T=[en,Ue,"t"],k=["+=","-=","*=","/="],E={},L=Oi(i)==c.o,P="end",D="begin",R="center",N="nearest",F="always",I="never",j="ifneeded",U=[tn,en,"xy","yx"],_=[D,P,R,N],B=[F,I,j],V=e.hasOwnProperty("el"),X=V?e.el:e,Y=!!(X instanceof r||f)&&X instanceof f,K=!Y&&ui(X),J=function(t,e){for(x=0;x<e.length;x++)if(t===e[x])return!0;return!1},Q=function(t){var e={};if(Oi(t)==c.a&&t.length>0)e.x=t[0],e.y=t[1];else if(Oi(t)==c.s||Oi(t)==c.n)e.x=t,e.y=t;else if(Oi(t)==c.o){for(var n in A=Oi(t.n)==c.b?t.n:A,t=zi({},t),x=0,t)t.hasOwnProperty(n)&&(x>2&&delete t[n],x++);var r=function(e){var n=e?C:T;for(x=0;x<n.length;x++)if(n[x]in t)return t[n[x]]};e.x=r(!0),e.y=r(!1)}return e},G=function(e,r){var i,o,a,s=e?Ee:Le,l=s.cs,u=s.ms,f=" * ",h=q&&e,d=h&&m.n&&!A,v="replace";if(Oi(r)==c.s){if(r.length>2){var p=r.substr(0,2);for(x=0;x<k.length;x++)if(p===k[x]){i=k[x];break}}r=(r=(r=(r=(r=(r=(r=(r=(r=i!==n?r.substr(2):r)[v](/min/g,0))[v](/</g,0))[v](/max/g,(d?"-":Qe)+$e))[v](/>/g,(d?"-":Qe)+$e))[v](/px/g,Qe))[v](/%/g,f+u*(h&&m.n?-1:1)/100))[v](/vw/g,f+Pe.w))[v](/vh/g,f+Pe.h),o=hi(t.parseFloat(t.eval(r)).toFixed())}else Oi(r)==c.n&&(o=r);if(!isNaN(o)&&o!==n&&Oi(o)==c.n){var y=A&&h,w=l*(y&&m.n?-1:1),b=y&&m.i,g=y&&m.n;switch(w=b?u-w:w,i){case"+=":a=w+o;break;case"-=":a=w-o;break;case"*=":a=w*o;break;case"/=":a=w/o;break;default:a=o}b&&(a=u-a),g&&(a*=-1),h&&m.n?(a=Math.max(u,a),a=Math.min(0,a)):(a=Math.min(u,a),a=Math.max(0,a)),a===l&&(a=n)}return a},Z=function(t,e,n,r){var i,o,a=[n,n],s=Oi(t);if(s==e)t=[t,t];else if(s==c.a){if((i=t.length)>2||i<1)t=a;else for(1===i&&(t[1]=n),x=0;x<i;x++)if(Oi(o=t[x])!=e||!J(o,r)){t=a;break}}else t=s==c.o?[t[tn]||n,t[en]||n]:a;return{x:t[0],y:t[1]}},$=function(t){var e,n,r=[],i=[Ue,_e,qe,Be];for(x=0;x<t.length&&x!==i.length;x++)(n=Oi(e=t[x]))==c.b?r.push(e?hi(H.css(Fe+i[x])):0):n==c.n?r.push(e):r.push(0);return r};if(Y||K){var tt,et=V?e.margin:0,nt=V?e.axis:0,rt=V?e.scroll:0,it=V?e.block:0,ot=[0,0,0,0],ct=Oi(et);if(0===(H=Y?X:r(X)).length)return;et=ct==c.n||ct==c.b?$([et,et,et,et]):ct==c.a?2===(tt=et.length)?$([et[0],et[1],et[0],et[1]]):tt>=4?$(et):ot:ct==c.o?$([et[Ue],et[_e],et[qe],et[Be]]):ot,S=J(nt,U)?nt:"xy",O=Z(rt,c.s,F,B),z=Z(it,c.s,D,_),M=et;var lt=H.offset();lt[Ue]-=M[0],lt[Be]-=M[3];var ut=at.offset(),ft={l:Ee.cs,t:Le.cs},ht={x:O.x==I||S==en,y:O.y==I||S==tn},dt={x:Math.round(lt[Be]-ut[Be]+ft.l),y:Math.round(lt[Ue]-ut[Ue]+ft.t)};if(q&&(m.n||m.i||(dt.x=Math.round(ut[Be]-lt[Be]+ft.l)),m.n&&A&&(dt.x*=-1),m.i&&A&&(dt.x=Math.round(ut[Be]-lt[Be]+(Ee.ms-ft.l)))),z.x!=D||z.y!=D||O.x==j||O.y==j){var vt,pt=H[0],yt={},xt={w:(yt=W?{w:(vt=pt.getBoundingClientRect())[Ye],h:vt[Ke]}:{w:pt[l.oW],h:pt[l.oH]}).w+M[3]+M[1],h:yt.h+M[0]+M[2]},mt=function(t){var e=si(t),n=e._wh,r=e.lt,i=e.xy,o=z[i]==(t&&q?D:P),a=z[i]==R,s=z[i]==N,c=O[i]==I,l=O[i]==j,u=Pe[n],f=ut[r],h=xt[n],d=lt[r],v=a?2:1,p=d+h/2,y=f+u/2,x=h<=u&&d>=f&&d+h<=f+u;c?ht[i]=!0:ht[i]||((s||l)&&(ht[i]=!!l&&x,o=h<u?p>y:p<y),(o||a)&&(dt[i]-=(u/v-h/v)*(t&&q&&A?-1:1)))};mt(!0),mt(!1)}ht.y&&delete dt.y,ht.x&&delete dt.x,e=dt}if(E[cn]=G(!0,Q(e).x),E[ln]=G(!1,Q(e).y),w=E[cn]!==n,b=E[ln]!==n,(w||b)&&(i>0||L))if(L)st.animate(E,i);else{if(g={duration:i,complete:a},Oi(o)==c.a){var wt={};wt[cn]=o[0],wt[ln]=o[1],g.specialEasing=wt}else g.easing=o;st.animate(E,g)}else w&&st[cn](E[cn]),b&&st[ln](E[ln])},Te.scrollStop=function(t,e,n){return st.stop(t,e,n),Te},Te.getElements=function(t){var e={target:et[0],host:nt[0],padding:at[0],viewport:st[0],content:lt[0],scrollbarHorizontal:{scrollbar:ht[0],track:dt[0],handle:vt[0]},scrollbarVertical:{scrollbar:pt[0],track:yt[0],handle:xt[0]},scrollbarCorner:ft[0]};return Oi(t)==c.s?mi(e,t):e},Te.getState=function(t){var e=function(t){if(!r.isPlainObject(t))return t;var e=zi(!0,{},t),n=function(t,n){e.hasOwnProperty(t)&&(e[n]=e[t],delete e[t])};return n("w",Ye),n("h",Ke),delete e.c,e},n={sleeping:e(B)||!1,autoUpdate:e(!he),widthAuto:e(Ot),heightAuto:e(zt),padding:e(Ht),overflowAmount:e(Rt),hideOverflow:e(St),hasOverflow:e(gt),contentScrollSize:e(wt),viewportSize:e(Pe),hostSize:e(mt),documentMixed:e(P)};return Oi(t)==c.s?mi(n,t):n},Te.ext=function(t){var e,n=ur.split(" "),r=0;if(Oi(t)==c.s){if(lr.hasOwnProperty(t))for(e=zi(!0,{},lr[t]);r<n.length;r++)delete e[n[r]]}else for(r in e={},lr)e[r]=zi(!0,{},Te.ext(r));return e},Te.addExt=function(e,n){var o,a,l,u,f=t[s].extension(e),h=!0;if(f){if(lr.hasOwnProperty(e))return Te.ext(e);if((o=f.extension.call(Te,zi(!0,{},f.defaultOptions),r,i))&&(Oi(l=o.contract)==c.f&&(h=Oi(u=l(t))==c.b?u:h),h))return lr[e]=o,Oi(a=o.added)==c.f&&a(n),Te.ext(e)}else console.warn('A extension with the name "'+e+"\" isn't registered.")},Te.removeExt=function(t){var e,n=lr[t];return!!n&&(delete lr[t],Oi(e=n.removed)==c.f&&e(),!0)},Ci(a,u,h))return o(a,Te),Te;Te=n}function wr(t,e,n){for(var r=e.split(rn),i=0;i<r.length;i++)t[0].addEventListener(r[i],n,{passive:!0})}function br(t,e,n){for(var r=e.split(rn),i=0;i<r.length;i++)t[0].removeEventListener(r[i],n,{passive:!0})}function gr(t,e){var o=3333333,a=i.rO(),s="animationstart mozAnimationStart webkitAnimationStart MSAnimationStart",u="childNodes",f=function(){t[ln](o)[cn](q?m.n?-o:m.i?0:o:o),e()};if(A){var h=t.append(xi(qn+" observed")).contents()[0];(h[wn]=new a(f)).observe(h)}else if(b>9||!w){t.prepend(xi(qn,xi({className:Bn,dir:"ltr"},xi(Bn,xi(Vn))+xi(Bn,xi({className:Vn,style:"width: 200%; height: 200%"})))));var v,p,y,x,g=t[0][u][0][u][0],S=r(g[u][1]),O=r(g[u][0]),z=r(O[0][u][0]),M=g[l.oW],W=g[l.oH],H=2,C=d.nativeScrollbarSize,T=function(){O[cn](o)[ln](o),S[cn](o)[ln](o)},k=function(){p=0,v&&(M=y,W=x,f())},E=function(t){return y=g[l.oW],x=g[l.oH],v=y!=M||x!=W,t&&v&&!p?(i.cAF()(p),p=i.rAF()(k)):t||k(),T(),t&&(i.prvD(t),i.stpP(t)),!1},L={},P={};P[Ue]=-(C.y+1)*H,P[_e]=C.x*-H,P[qe]=C.y*-H,P[Be]=-(C.x+1)*H,r(g).css(P),O.on(Ze,E),S.on(Ze,E),t.on(s,function(){E(!1)}),L[Ye]=o,L[Ke]=o,z.css(L),T()}else{var D=Z[0],R=D.attachEvent,N=b!==n;if(R)t.prepend(xi(qn)),Ai(t,nn+qn)[0].attachEvent("onresize",f);else{var F=D.createElement(c.o);F.setAttribute("tabindex","-1"),F.setAttribute(l.c,qn),F.onload=function(){var t=this.contentDocument.defaultView;t.addEventListener("resize",f),t.document.documentElement.style.display="none"},F.type="text/html",N&&t.prepend(F),F.data="about:blank",N||t.prepend(F),t.on(s,f)}}if(t[0]===it[0]){var I=function(){var e=nt.css("direction"),n={},r=0,i=!1;return e!==kt&&("ltr"===e?(n[Be]=0,n[_e]=Ge,r=o):(n[Be]=Ge,n[_e]=0,r=m.n?-o:m.i?0:o),it.children().eq(0).css(n),t[cn](r)[ln](o),kt=e,i=!0),i};I(),t.on(Ze,function(t){return I()&&Zr(),i.prvD(t),i.stpP(t),!1})}}function Sr(t){if(A){var e=t.contents()[0];e[wn].disconnect(),delete e[wn]}else Hi(t.children(nn+qn).eq(0))}function Or(t){}function zr(t){}function Mr(){de&&!he&&(ue.observe(nt[0],{attributes:!0,attributeOldValue:!0,attributeFilter:[l.i,l.c,l.s]}),fe.observe(E?et[0]:lt[0],{attributes:!0,attributeOldValue:!0,subtree:!E,childList:!E,characterData:!E,attributeFilter:E?["wrap","cols","rows"]:[l.i,l.c,l.s]}),he=!0)}function Wr(){de&&he&&(ue.disconnect(),fe.disconnect(),he=!1)}function Hr(){if(!B){var t=it[0],e={w:t[l.sW],h:t[l.sH]};if(T){var n=gi(e,Qt);Qt=e,n&&Zr(!0,!1)}else Qt=e}}function Ar(){Se&&ri(!0)}function Cr(){Se&&!tt.hasClass(sr)&&ri(!1)}function Tr(){ge&&(ri(!0),clearTimeout(xe),xe=setTimeout(function(){ge&&!k&&ri(!1)},100))}function kr(t){B||(V!==n?clearTimeout(V):((be||ge)&&ri(!0),pi()||Mi(nt,Cn),ci("onScrollStart",t)),oi(!0,st[cn]()),oi(!1,st[ln]()),ci("onScroll",t),V=setTimeout(function(){k||(Er(),ci("onScrollStop",t))},Re))}function Er(){clearTimeout(V),V=n,(be||ge)&&ri(!1),pi()||Wi(nt,Cn)}function Lr(){Gr(),Te.update(Ge)}function Pr(t){var e=t.keyCode;if(!vi(e)){if(0===yr.length){var n=function(){Gr(),Te.update(Ge)};n(),ve=setInterval(n,1e3/60)}-1===r.inArray(e,yr)&&yr.push(e)}}function Dr(t){var e=t.keyCode;if(!vi(e)){var n=r.inArray(e,yr);n>-1&&yr.splice(n,1),0===yr.length&&(Gr(),Te.update(Ge),clearInterval(ve))}}function Rr(){setTimeout(function(){k||(Gr(),Te.update(Ge))},50)}function Nr(){pe=!0}function Fr(){pe=!1,clearInterval(ve),yr=[],Gr(),Te.update(Ge)}function Ir(t){return et[cn](m.i&&ne?9999999:0),et[ln](0),i.prvD(t),i.stpP(t),!1}function jr(t){if(!B){var e=(t.originalEvent||t).touches!==n;(1===i.mBtn(t)||e)&&(he&&(Me=!0,Wr()),xr=i.page(t),mr.w=nt[0][l.oW]-(D?0:N),mr.h=nt[0][l.oH]-(D?0:F),Z.on(xn,qr).on(hn,Ur).on(fn,_r),Mi(tt,sr),ft.setCapture&&ft.setCapture(),i.prvD(t),i.stpP(t))}}function Ur(t){var e=i.page(t),n={};(Ae||He)&&(n[Ye]=mr.w+e.x-xr.x),(Ce||He)&&(n[Ke]=mr.h+e.y-xr.y),nt.css(n),i.stpP(t)}function _r(t){var e=t!==n;Z.off(xn,qr).off(hn,Ur).off(fn,_r),Wi(tt,sr),ft.releaseCapture&&ft.releaseCapture(),e&&(Me&&Mr(),Te.update(Ge)),Me=!1}function qr(t){return i.prvD(t),!1}function Br(){Zr()}function Vr(){var t={};return L&&ct&&(t.w=hi(ct.css(Ve+Ye)),t.h=hi(ct.css(Ve+Ke)),t.c=gi(t,se),t.f=!0),se=t,t.c||!1}function Xr(t,e){var i=e!==n&&null!==e?e.split(rn):Qe,o=t!==n&&null!==t?t.split(rn):Qe;if(i===Qe&&o===Qe)return!1;var a,s,c,l,u=fi(o,i),f=!1,h=ie!==n&&null!==ie?ie.split(rn):[Qe],d=re!==n&&null!==re?re.split(rn):[Qe],v=r.inArray(cr,u),p=u[a];for(v>-1&&u.splice(v,1),a=0;a<u.length;a++)if(0!==(p=u[a]).indexOf(Sn)){for(c=!0,l=!0,s=0;s<h.length;s++)if(p===h[s]){c=!1;break}for(s=0;s<d.length;s++)if(p===d[s]){l=!1;break}if(c&&l){f=!0;break}}return f}function Yr(t){var e=t.attributeName,n=t.target,r=t.type,i="closest";if(n===lt[0])return null===e;if("attributes"===r&&(e===l.c||e===l.s)&&!E){if(typeof n[i]!=c.f)return!0;if(null!==n[i](nn+qn)||null!==n[i](nn+Yn)||null!==n[i](nn+tr))return!1}return!0}function Kr(){if(B)return!1;var t,e,n=E&&Ot&&!jt?et.val().length:0,r=!he&&Ot&&!E,i={};C&&(e={x:st[0][l.sW],y:st[0][l.sH]}),r&&(t=lt.css(Je),i[Je]=q?_e:Be,i[Ye]=Ge,lt.css(i));var o={w:yi()[l.sW]+n,h:yi()[l.sH]+n};r&&(i[Je]=t,i[Ye]=$e,lt.css(i));var a=Vr(),s=gi(o,Jt),c=gi(e,ce,tn,en);return Jt=o,ce=e,s||a||c}function Jr(){if(B||he)return!1;var t=nt.attr(l.i)||Qe,e=bi(t,_t),n=nt.attr(l.c)||Qe,r=bi(n,qt),i=nt.attr(l.s)||Qe,o=bi(i,Bt),a=nt.is(":visible")||Qe,s=bi(a,Vt),c=E&&et.attr("rows")||Qe,u=bi(c,Xt),f=E&&et.attr("cols")||Qe,h=bi(f,Yt),d=E&&et.attr("wrap")||Qe,v=bi(d,Kt);return _t=t,r&&(r=Xr(qt,n)),qt=n,Bt=i,Vt=a,Xt=c,Yt=f,Kt=d,e||r||o||s||u||h||v}function Qr(t){if(!T)return!0;var e="flex-grow",n="flex-shrink",r="flex-basis",i=[Ye,Ve+Ye,Xe+Ye,Fe+Be,Fe+_e,Be,_e,"font-weight","word-spacing",e,n,r],o=[Ie+Be,Ie+_e,je+Be+Ye,je+_e+Ye],a=[Ke,Ve+Ke,Xe+Ke,Fe+Ue,Fe+qe,Ue,qe,"line-height",e,n,r],s=[Ie+Ue,Ie+qe,je+Ue+Ye,je+qe+Ye],c="s",l="v-s",u=Dt.x===c||Dt.x===l,f=!1,h=function(t,e){for(var n=0;n<t.length;n++)if(t[n]===e)return!0;return!1};return(Dt.y===c||Dt.y===l)&&((f=h(a,t))||D||(f=h(s,t))),u&&!f&&((f=h(i,t))||D||(f=h(o,t))),f}function Gr(){if(!B){var t,e,n,r,i=!jt,o=Pe.w-(D||Et||!Ot?0:F+j),a=Pe.h-(D||Et||!zt?0:F+j),s={},c=Ot||i,u=et[0];return s[Ve+Ye]=Qe,s[Ve+Ke]=Qe,s[Ye]=Ge,et.css(s),t=u[l.oW],e=c?Math.max(t,u[l.sW]-1):1,e+=Ot?U+(D?0:i?0:N+I):0,s[Ye]=Ot?e:$e,s[Ke]=Ge,et.css(s),n=u[l.oH],r=Math.max(n,u[l.sH]-1),s[Ye]=e,s[Ke]=r,ut.css(s),s[Ve+Ye]=o+(!D&&Ot?N+I:0),s[Ve+Ke]=a+(!D&&zt?F+j:0),et.css(s),{ow:t,oh:n,dw:e,dh:r}}}function Zr(t,e,o){var a=i.now(),s=hr>0&&T&&a-J<hr&&!zt&&!Ot,c=nt.is(":hidden"),u=bi(c,le,o);if(le=c,clearTimeout(Q),s&&(fr.h=t,fr.c=e,fr.f=o,Q=setTimeout(Zr,hr)),!(k||s||B||T&&!o&&c||"inline"===nt.css("display"))){J=a,t=t||fr.h,e=e||fr.c,o=o||fr.f,fr={},t=t!==n&&t,e=e!==n&&e,o=o!==n&&o,!g||y.x&&y.y?O=zi(!0,{},d.nativeScrollbarSize):(O.x=0,O.y=0),De={x:3*(O.x+(y.x?0:3)),y:3*(O.y+(y.y?0:3))},Or(it),Or(rt);var f={l:st[cn](),t:st[ln]()},h=K.scrollbars,p=K.textarea,b=h.visibility,z=bi(b,Gt,o),M=h.autoHide,W=bi(M,Zt,o),A=h.clickScrolling,P=bi(A,$t,o),V=h.dragScrolling,X=bi(V,te,o),Y=K.className,G=bi(Y,re,o),Z=K.resize,$=bi(Z,ee,o)&&!L,tt=!!E&&"off"!==et.attr("wrap"),ht=bi(tt,jt,o),dt=K.paddingAbsolute,vt=bi(dt,Et,o),pt=K.clipAlways,yt=bi(pt,Lt,o),xt=K.sizeAutoCapable&&!L,kt=bi(xt,It,o),_t=K.nativeScrollbarsOverlaid.showNativeScrollbars,qt=bi(_t,Nt),Bt=K.autoUpdate,Vt=bi(Bt,Ft),Xt=K.overflowBehavior,Yt=gi(Xt,Dt,tn,en,o),Kt=p.dynWidth,Jt=bi(ae,Qt),Qt=p.dynHeight,ce=bi(oe,Qt);if(we="n"===M,be="s"===M,ge="m"===M,Se="l"===M,me=h.autoHideDelay,Oe=h.touchSupport,ie=re,We="n"===Z,He="b"===Z,Ae="h"===Z,Ce="v"===Z,ne=K.normalizeRTL,_t=_t&&y.x&&y.y,Gt=b,Zt=M,$t=A,te=V,re=Y,ee=Z,jt=tt,Et=dt,Lt=pt,It=xt,Nt=_t,Ft=Bt,Dt=zi(!0,{},Xt),ae=Kt,oe=Qt,G&&(Wi(nt,ie+rn+cr),Mi(nt,Y!==n&&null!==Y&&Y.length>0?Y:cr)),Vt&&(!0===Bt?(Wr(),v.add(Te)):null===Bt&&w?(Wr(),v.add(Te)):(v.remove(Te),Mr())),kt)if(xt)if(ot===n&&(ot=r(xi(Un)),at.before(ot)),R)rt.show();else{rt=r(xi(_n)),ot.before(rt);var ue={w:-1,h:-1};gr(rt,function(){var t={w:rt[0][l.oW],h:rt[0][l.oH]};gi(t,ue)&&(T&&zt&&t.h>0||Ot&&t.w>0?Zr():(T&&!zt&&0===t.h||!Ot&&0===t.w)&&Zr()),ue=t}),R=!0,null!==S&&rt.css(Ke,S+"(100% + 1px)")}else R&&rt.hide();o&&(it.find("*").trigger(Ze),R&&rt.find("*").trigger(Ze));var fe,de=nt.css("direction"),ve=bi(de,Tt,o),ye=nt.css("box-sizing"),xe=bi(ye,Wt,o),ze={c:o,t:hi(nt.css(Ie+Ue)),r:hi(nt.css(Ie+_e)),b:hi(nt.css(Ie+qe)),l:hi(nt.css(Ie+Be))};try{fe=R?rt[0].getBoundingClientRect():null}catch(Ni){return}D="border-box"===ye;var Me=(q="rtl"===de)?Be:_e,Ee=q?_e:Be,Le=nt[0],Re=at[0],Ne=!1,nn=!(!R||"none"===nt.css(Je))&&(0===Math.round(fe.right-fe.left)&&(!!dt||Le[l.cW]-N>0));if(xt&&!nn){var on=Le[l.oW],an=ot.css(Ye);ot.css(Ye,Ge);var sn=Le[l.oW];ot.css(Ye,an),(Ne=on!==sn)||(ot.css(Ye,on+1),sn=Le[l.oW],ot.css(Ye,an),Ne=on!==sn)}var fn=(nn||Ne)&&xt&&!c,pn=bi(fn,Ot,o),yn=!fn&&Ot,xn=!(!R||c)&&0===Math.round(fe.bottom-fe.top),mn=bi(xn,zt,o),wn=!xn&&zt,bn="-"+Ye,gn=fn&&D||!D,Sn=xn&&D||!D,On={c:o,t:Sn?hi(nt.css(je+Ue+bn)):0,r:gn?hi(nt.css(je+_e+bn)):0,b:Sn?hi(nt.css(je+qe+bn)):0,l:gn?hi(nt.css(je+Be+bn)):0},zn={c:o,t:hi(nt.css(Fe+Ue)),r:hi(nt.css(Fe+_e)),b:hi(nt.css(Fe+qe)),l:hi(nt.css(Fe+Be))},Mn={h:String(nt.css(Xe+Ke)),w:String(nt.css(Xe+Ye))},Wn={},Ln={};if(N=ze.l+ze.r,F=ze.t+ze.b,ze.c=Si(ze,Ht),I=On.l+On.r,j=On.t+On.b,On.c=Si(On,At),U=zn.l+zn.r,_=zn.t+zn.b,zn.c=Si(zn,Ct),Mn.ih=hi(Mn.h),Mn.iw=hi(Mn.w),Mn.ch=Mn.h.indexOf("px")>-1,Mn.cw=Mn.w.indexOf("px")>-1,Mn.c=gi(Mn,Mt,o),Tt=de,Wt=ye,Ot=fn,zt=xn,Ht=ze,At=On,Ct=zn,Mt=Mn,ve&&R&&rt.css(Je,Ee),ze.c||ve||vt||pn||mn||xe||kt){var Pn={},Dn={};li(Ln,Fe,[-ze.t,-ze.r,-ze.b,-ze.l]),dt?(li(Pn,Qe,[ze.t,ze.r,ze.b,ze.l]),li(E?Dn:Wn,Ie)):(li(Pn,Qe),li(E?Dn:Wn,Ie,[ze.t,ze.r,ze.b,ze.l])),at.css(Pn),et.css(Dn)}Pe={w:Re[l.oW],h:Re[l.oH]};var Rn=!!E&&Gr();if(xn&&(mn||vt||xe||Mn.c||ze.c||On.c)?(Mn.cw&&(Wn[Xe+Ke]=Mn.ch?Mn.ih-(dt?F:0)+(D?-j:F):Qe),Wn[Ke]=Ge):(mn||vt)&&(Wn[Xe+Ke]=Qe,Wn[Ke]=$e),fn&&(pn||vt||xe||Mn.c||ze.c||On.c||ve)?(Mn.cw&&(Wn[Xe+Ye]=Mn.cw?Mn.iw-(dt?N:0)+(D?-I:N)+(y.y?x.y:0):Qe),Wn[Ye]=Ge,Ln[Xe+Ye]=$e):(pn||vt)&&(Wn[Xe+Ye]=Qe,Wn[Ye]=$e,Wn[Je]=Qe,Ln[Xe+Ye]=Qe),fn&&(Mn.cw||(Wn[Xe+Ye]=Qe),Ln[Ye]=E&&Kt?Rn.dw:Ge,Wn[Ye]=Ge,Wn[Je]=Ee),xn&&(Mn.ch||(Wn[Xe+Ke]=Qe),Ln[Ke]=E?Qt?Rn.dh:Ge:lt[0][l.cH]),xt&&ot.css(Ln),lt.css(Wn),Wn={},Ln={},gt=gt||{x:!1,y:!1},t||e||ve||xe||vt||pn||fn||mn||xn||Mn.c||qt||Yt||yt||$||z||Jt||ce||ht||vt||Jt||ce||o){var Nn="overflow",Fn=Nn+"-x",In=Nn+"-y",qn="hidden",Bn="visible",Vn=C?y.x||y.y||Pe.w<De.y||Pe.h<De.x||xn||u:xn,Xn={},Yn=gt.y&&St.ys&&!_t?y.y?st.css(Me):-O.y:0,Kn=gt.x&&St.xs&&!_t?y.x?st.css(qe):-O.x:0;li(Xn,Qe),st.css(Xn),Vn&&lt.css(Nn,qn);var Jn=yi(),Qn=C&&!Vn?st[0]:Jn,Gn={w:Jn[l.cW],h:Jn[l.cH]},Zn={w:Math.max(Jn[l.sW],Qn[l.sW]),h:Math.max(Jn[l.sH],Qn[l.sH])},$n={w:E&&Rn&&!Kt?Rn.ow:fn?Gn.w:Zn.w,h:E&&Rn&&!Qt?Rn.oh:xn?Gn.h:Zn.h};Xn[qe]=wn?Qe:Kn,Xn[Me]=yn?Qe:Yn,st.css(Xn);var tr={w:Le[l.cW],h:Le[l.cH]},or={w:Math.max($n.w+(dt?N:0),tr.w-N)-(Kt&&E&&fn?U+(D?0:N+I):0),h:Math.max($n.h+(dt?F:0),tr.h-F)};if(or.c=gi(or,Pt,o),Pt=or,xt){(or.c||xn||fn)&&(Ln[Ye]=or.w,Ln[Ke]=or.h);var ar=Ln[Ye]+(D?I:-N),sr=Ln[Ke]+(D?j:-N),lr={};(!fn||!fn&&On.c)&&(Ln[Ye]=tr.w-(D?0:N+I)-1-U),(!xn||!xn&&On.c)&&(Ln[Ke]=tr.h-(D?0:F+j)-1-_),Mn.cw&&Mn.iw===ar&&(Ln[Ye]=ar+(D?0:N)+1),Mn.ch&&Mn.ih===sr&&(Ln[Ke]=sr+(D?0:F)+1),fn&&(Gn.w<Pe.w||E&&!tt)&&0===N&&(E&&(lr[Ye]=hi(ut.css(Ye))-1),Ln[Ye]-=1),xn&&(Gn.h<Pe.h||E)&&0===F&&(E&&(lr[Ke]=hi(ut.css(Ke))-1),Ln[Ke]-=1),$n.h>0&&(Ln[Ye]=Math.max(1,Ln[Ye]),Ln[Ke]=Math.max(1,Ln[Ke])),E&&ut.css(lr),ot.css(Ln)}fn&&(Wn[Ye]=$e),!fn||D||he||(Wn[Je]="none"),lt.css(Wn),Wn={};var ur=Jn.getBoundingClientRect(),dr={w:Math.max(Jn[l.sW],Qn[l.sW]),h:Math.max(Jn[l.sH],Qn[l.sH])};if(Vn&&lt.css(Nn,Qe),ur.width){var vr=ur.width,pr=ur.height,yr=.001;dr.w+=hi(vr+yr)-vr,dr.h+=hi(pr+yr)-pr}dr.c=e=gi(dr,wt,o),wt=dr,t=gi(tr={w:Le[l.cW],h:Le[l.cH]},mt),mt=tr,Pe={w:Re[l.oW],h:Re[l.oH]};var xr={x:"v-s"===Xt.x,y:"v-s"===Xt.y},mr={x:"v-h"===Xt.x,y:"v-h"===Xt.y},Sr={x:"s"===Xt.x,y:"s"===Xt.y},Hr={x:Math.max(0,Math.round(100*(dr.w-tr.w+(dt?N:0)))/100),y:Math.max(0,Math.round(100*(dr.h-tr.h+(dt?F:0)))/100)},kr=E&&(0===Pe.w||0===Pe.h);kr&&(Hr.x=0,Hr.y=0);var Er={x:Hr.x>0,y:Hr.y>0},Lr={x:Er.x,y:Er.y};(xr.x||mr.x)&&(Lr.x=Er.y&&!xr.y&&!mr.y),(xr.y||mr.y)&&(Lr.y=Er.x&&!xr.x&&!mr.x),Lr.xs=!!Lr.x&&(Sr.x||xr.x),Lr.ys=!!Lr.y&&(Sr.y||xr.y);var Pr={x:Er.x&&Lr.xs,y:Er.y&&Lr.ys},Dr=Rt;if(Hr.c=gi(Hr,Rt,tn,en,o),Rt=Hr,Er.c=gi(Er,gt,tn,en,o),gt=Er,Lr.c=gi(Lr,St,tn,en,o),St=Lr,y.x||y.y){var Rr=o,Nr={};if((Er.x||Er.y)&&(Nr.w=y.y&&Er.y?dr.w+x.y:Qe,Nr.h=y.x&&Er.x?dr.h+x.x:Qe,Rr=bi(Nr,bt,o),bt=Nr),Er.c||Lr.c||dr.c||ve||pn||mn||fn||xn||qt){var Fr="px solid transparent";Wn[je+Ee]=Qe,Wn[Fe+Ee]=Qe,y.x&&Er.x&&Lr.xs?(xn&&(Wn[Fe+qe]=_t?Qe:x.x),Wn[je+qe]=xn||_t?Qe:x.x+Fr):(Nr.h=Qe,Rr=!0,Wn[je+qe]=Qe,Wn[Fe+qe]=Qe),y.y&&Er.y&&Lr.ys?(fn&&(Wn[Fe+Me]=_t?Qe:x.y),Wn[je+Me]=_t?Qe:x.y+Fr):(Nr.w=Qe,Rr=!0,Wn[je+Me]=Qe,Wn[Fe+Me]=Qe)}if(_t&&(Nr.w=Qe,Nr.h=Qe,Rr=!0),Rr){var Ir={};Ir[Ye]=Lr.y?Nr.w:Qe,Ir[Ke]=Lr.x?Nr.h:Qe,ct||(ct=r(xi(jn)),st.prepend(ct)),ct.css(Ir)}lt.css(Wn)}var Ur={};Pn={};if(t||Er.c||Lr.c||dr.c||Yt||xe||qt||ve||yt||mn){Ur[Ee]=Qe;var _r=function(){Ur[qe]=Qe,ke.h=0},qr=function(){Ur[Me]=Qe,ke.w=0};if(Er.x&&Lr.xs?(Ur[Fn]=Ze,_t?_r():(Ur[qe]=-(y.x?x.x:O.x),ke.h=y.x?x.y:0)):(Ur[Fn]=Qe,_r()),Er.y&&Lr.ys?(Ur[In]=Ze,_t?qr():(Ur[Me]=-(y.y?x.y:O.y),ke.w=y.y?x.x:0)):(Ur[In]=Qe,qr()),(Pe.h<De.x||Pe.w<De.y)&&(Er.x&&Lr.x&&!y.x||Er.y&&Lr.y&&!y.y)?(Ur[Ie+Ue]=De.x,Ur[Fe+Ue]=-De.x,Ur[Ie+Ee]=De.y,Ur[Fe+Ee]=-De.y):(Ur[Ie+Ue]=Qe,Ur[Fe+Ue]=Qe,Ur[Ie+Ee]=Qe,Ur[Fe+Ee]=Qe),Ur[Ie+Me]=Qe,Ur[Fe+Me]=Qe,Er.x&&Lr.x||Er.y&&Lr.y||kr?E&&kr&&(Pn[Fn]=qn,Pn[In]=qn):(!pt||mr.x||xr.x||mr.y||xr.y)&&(E&&(Pn[Fn]=Qe,Pn[In]=Qe),Ur[Fn]=Bn,Ur[In]=Bn),at.css(Pn),st.css(Ur),Ur={},(Er.c||xe||pn||mn)&&(!y.x||!y.y)){var Br=lt[0],Xr=Br[l.s];Xr.webkitTransform="scale(1)",Xr.display="run-in",Br[l.oH],Xr.display=Qe,Xr.webkitTransform=Qe}}if(Wn={},ve||pn||mn)if(q&&fn){var Yr=lt.css(Je),Kr=Math.round(lt.css(Je,Qe).css(Be,Qe).position().left);lt.css(Je,Yr),Kr!==Math.round(lt.position().left)&&(Wn[Be]=Kr)}else Wn[Be]=Qe;lt.css(Wn);var Jr="v"===b,Qr="h"===b,$r="a"===b,ti=i.bind(ni,0,!0,!0,Pr.x),ei=i.bind(ni,0,!1,!0,Pr.y),si=i.bind(ni,0,!0,!1,Pr.x),ui=i.bind(ni,0,!1,!1,Pr.y);if(Lr.x||Lr.y?Mi(nt,Tn):Wi(nt,Tn),Lr.x?Mi(nt,kn):Wi(nt,kn),Lr.y?Mi(nt,En):Wi(nt,En),ve&&(q?Mi(nt,Hn):Wi(nt,Hn)),L&&Mi(nt,An),$){var fi=function(){ft.on(un,jr)},vi=function(){ft.off(un,jr)};We?(Mi(nt,An),Wi(ft,[er,nr,rr,ir].join(rn)),vi()):(Wi(nt,An),Mi(ft,er),He?Mi(ft,nr):Ae?Mi(ft,rr):Ce&&Mi(ft,ir),vi(),fi())}if((z||Yt||Lr.c||Er.c||qt)&&(_t?qt&&(Wi(nt,Cn),_t&&(si(),ui())):$r?(Pr.x?ti():si(),Pr.y?ei():ui()):Jr?(ti(),ei()):Qr&&(si(),ui())),W||qt){var pi=function(t){H?t?wr(nt,hn,Tr):(wr(nt,dn,Ar),wr(nt,vn,Cr)):t?nt.on(hn,Tr):nt.on(dn,Ar).on(vn,Cr),T||nt.one("mouseover",Ar)},mi=function(){H?(br(nt,hn,Tr),br(nt,dn,Ar),br(nt,vn,Cr)):nt.off(hn,Tr).off(dn,Ar).off(vn,Cr)};Se||ge?(mi(),pi(ge)):mi(),we?ri(!0):ri(!1,!0)}if((t||Hr.c||mn||pn||$||xe||vt||qt||ve)&&(ii(!0),oi(!0,f.l),ii(!1),oi(!1,f.t)),P&&ai(!0,A),X&&ai(!1,V),E&&e){var wi=di();if(wi){var Oi=Ut===n||wi.rows!==Ut.rows,Hi=wi.cR,Ai=wi.cC,Ci=wi.w,Ti=wi.r,ki=wi.c,Ei=wi.p,Li=wi.m===Ei&&pe,Pi={x:tt||Ai!==ki||Hi!==Ci?-1:Rt.x,y:(tt?Li||Oi&&Dr!==n&&f.t===Dr.y:(Li||Oi)&&Hi===Ti)?Rt.y:-1},Di=Pi.x>-1,Ri=Pi.y>-1;(Di||Ri)&&(Ri&&st[ln](Pi.y),Di&&(q&&ne&&m.i?st[cn](0):st[cn](Pi.x)))}Ut=wi}else E||(q&&m.i&&y.y&&Er.x&&ne&&(f.l+=ke.w||0),st[cn](f.l),st[ln](f.t));ve&&ci("onDirectionChanged",{isRTL:q,dir:de}),t&&ci("onHostSizeChanged",{width:mt.w,height:mt.h}),e&&ci("onContentSizeChanged",{width:wt.w,height:wt.h}),(Er.c||Lr.c)&&ci("onOverflowChanged",{x:Er.x,y:Er.y,xScrollable:Lr.xs,yScrollable:Lr.ys,clipped:Lr.x||Lr.y}),Hr.c&&ci("onOverflowAmountChanged",{x:Hr.x,y:Hr.y})}L&&(Er.c||se.c)&&(se.f||Vr(),y.y&&Er.x&&lt.css(Ve+Ye,se.w+x.y),y.x&&Er.y&&lt.css(Ve+Ke,se.h+x.x),se.c=!1),zr(it),zr(rt),ci("onUpdated",{forced:o})}}function $r(t){Y=zi(!0,{},Y,z.v(t,z.t,!0)),K=zi(!0,{},K,z.v(t,z.t,!1,!0))}function ti(){ht=r(xi(Yn+rn+or)),dt=r(xi(Kn)),vt=r(xi(Qn)),pt=r(xi(Yn+rn+ar)),yt=r(xi(Kn)),xt=r(xi(Qn)),ht.append(dt),dt.append(vt),pt.append(yt),yt.append(xt),at.after(pt),at.after(ht),M&&(ht.on(mn,function(t){t.target===ht[0]&&(ii(!0),oi(!0,st[cn]()))}),pt.on(mn,function(t){t.target===pt[0]&&(ii(!1),oi(!1,st[ln]()))})),ei(!0),ei(!1),ft=r(xi(tr)),nt.append(ft)}function ei(t){var e,o,a,s=si(t),c=s.xy,l=Ze+s.LT,u="active",f=1,h=[16,17],d=function(){f=.5},v=function(){f=1},p=function(n){var r=s.i.tl,a=s.i.hl,u=s.i.ms*((i.page(n)[c]-o)/(r-a));u=isFinite(u)?u:0,q&&t&&!m.i&&(u*=-1),st[l](e+u),H||i.prvD(n)},y=function(t){t=t||t.originalEvent;var r=nt[0].getBoundingClientRect(),i=t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom;Wi(tt,sr),Wi(s.h,u),Wi(s.t,u),Wi(s.s,u),Z.off(hn,p).off(fn,y).off(pn,x).off(yn,w).off(xn,qr),v(),e=n,o=n,a!==n&&(Te.scrollStop(),clearTimeout(a),a=n),i||Cr(),(be||ge)&&ri(!1)},x=function(t){r.inArray(t.keyCode,h)>-1&&d()},w=function(t){r.inArray(t.keyCode,h)>-1&&v()},g=function(t){var e=(t.originalEvent||t).touches!==n;return!(B||pi()||!te||e&&!Oe)&&(1===i.mBtn(t)||e)},S=function(r){e=(e=st[l]())===n?0:e,(q&&t&&!m.n||!q)&&(e=e<0?0:e),o=i.page(r)[c],Mi(tt,sr),Mi(s.h,u),Mi(s.s,u),Z.on(hn,p).on(fn,y).on(xn,qr),!b&&P||i.prvD(r),i.stpP(r)};s.h.on(un,function(t){g(t)&&S(t)}),s.t.on(un,function(e){if(g(e)){var r,h,v=Pe[s._wh],p=s.t.offset()[s.lt],b=e.ctrlKey,O=e.shiftKey,z=O&&b,M=!0,W="linear",H=function(){if(!k){var i=o-p,c=s.i.tl,u=s.i.ho,d=s.i.hl,y=s.i.ms,x=270*f,w=M?Math.max(400,x):x,b=y*((i-d/2)/(c-d)),g=q&&t&&(!m.i&&!m.n||ne),A=g?u<i:u>i,C={};O?(b=isFinite(b)?b:0,q&&t&&!m.i&&(b=y-b),z?(C.n=!1,C[s.xy]=b,Te.scroll(C,130,W,function(){S(e)})):(st[l](b),S(e))):(r=M?A:r,h=g?r?u+d>=i:u<=i:r?u<=i:u+d>=i,C[s.xy]=r?"-="+v:"+="+v,Te.scrollStop(),Te.scroll(C,x,W),h?(clearTimeout(a),Te.scrollStop(),a=n):a=setTimeout(H,w),M=!1)}};b&&d(),o=i.page(e)[c],Mi(tt,sr),Mi(s.t,u),Mi(s.s,u),Z.on(fn,y).on(pn,x).on(yn,w).on(xn,qr),H(),i.prvD(e),i.stpP(e)}}).hover(function(){(be||ge)&&(ze=!0,ri(!0))},function(){(be||ge)&&(ze=!1,ri(!1))}),s.s.on(un,function(t){i.stpP(t)})}function ni(t,e,n){var r=t?zn:Mn,i=t?ht:pt;e?Wi(nt,r):Mi(nt,r),n?Wi(i,Zn):Mi(i,Zn)}function ri(t,e){if(clearTimeout(ye),t)Wi(ht,$n),Wi(pt,$n);else{var n="active",r=function(){if(!ze&&!k){var t=vt.hasClass(n)||xt.hasClass(n);!t&&(be||ge||Se)&&Mi(ht,$n),!t&&(be||ge||Se)&&Mi(pt,$n)}};me>0&&!0!==e?ye=setTimeout(r,me):r()}}function ii(t){var e={},n=si(t),r=1e6,i=Math.min(1,(mt[n._wh]-(Et?t?N:F:0))/wt[n._wh]);e[n.wh]=Math.floor(100*i*r)/r+"%",pi()||n.h.css(e),n.i.hl=n.h[0]["offset"+n.WH],n.i.hlr=i}function oi(t,e){var n,r,i,o=q&&t,a={},s=si(t),c="translate(",l="transform",u=st[0][Ze+s.WH]-st[0]["client"+s.WH],f=s.i.hl,h=s.t[0]["offset"+s.WH],d=h-f;m.n&&o&&(u*=-1),i=e/u,i=isNaN(i)?0:Math.min(1,i),s.i.ms=u,s.i.cs=e,s.i.csr=i,d*=i,d=isNaN(d)?0:d,o&&!m.i&&(d=h-f-d),d=Math.max(0,d),W?(r=(r=o?-(h-f-d):d)/h*100*(h/f),n=t?c+r+"%, 0)":c+"0, "+r+"%)",a["-webkit-"+l]=n,a["-moz-"+l]=n,a["-ms-"+l]=n,a["-o-"+l]=n,a[l]=n):a[s.lt]=d,pi()||s.h.css(a),s.i.ho=d,s.i.tl=h}function ai(t,e){var n=e?"removeClass":"addClass",r=t?yt:xt,i=t?Jn:Gn;(t?dt:vt)[n](i),r[n](i)}function si(t){return{wh:t?Ye:Ke,WH:t?"Width":"Height",lt:t?Be:Ue,LT:t?"Left":"Top",xy:t?tn:en,XY:t?"X":"Y",_wh:t?"w":"h",_lt:t?"l":"t",t:t?dt:yt,h:t?vt:xt,s:t?ht:pt,i:t?Ee:Le}}function ci(t,e){if(T){var n,i=K.callbacks[t],o=t;"on"===o.substr(0,2)&&(o=o.substr(2,1).toLowerCase()+o.substr(3)),Oi(i)==c.f&&i.call(Te,e),r.each(lr,function(){Oi((n=this).on)==c.f&&n.on(o,e)})}}function li(t,e,r){r===n&&(r=[Qe,Qe,Qe,Qe]),t[e+Ue]=r[0],t[e+_e]=r[1],t[e+qe]=r[2],t[e+Be]=r[3]}function ui(e){var n="ownerDocument",r="HTMLElement",i=e&&e[n]&&e[n].parentWindow||t;return typeof i[r]==c.o?e instanceof i[r]:e&&typeof e==c.o&&null!==e&&1===e.nodeType&&typeof e.nodeName==c.s}function fi(t,e){var n,r,i=[],o=[];for(n=0;n<t.length;n++)i[t[n]]=!0;for(n=0;n<e.length;n++)i[e[n]]?delete i[e[n]]:i[e[n]]=!0;for(r in i)o.push(r);return o}function hi(e){var n=t.parseInt(e);return isNaN(n)?0:n}function di(){var t=et[0].selectionStart;if(t!==n){var e,r,i="length",o=et.val(),a=o[i],s=o.split("\n"),c=s[i],l=o.substr(0,t).split("\n"),u=0,f=0,h=l[i],d=l[l[i]-1][i];for(r=0;r<s[i];r++)(e=s[r][i])>f&&(u=r+1,f=e);return{cR:h,cC:d,r:c,c:f,w:u,p:t,m:a}}}function vi(t){for(var e=0;e<pr.length;e++)if(t===pr[e])return!0;return!1}function pi(){return Nt&&y.x&&y.y}function yi(){return E?ut[0]:lt[0]}function xi(t,e){return"<div "+(t?Oi(t)==c.s?'class="'+t+'"':function(){var e,n="";if(r.isPlainObject(t))for(e in t)n+=("className"===e?"class":e)+'="'+t[e]+'" ';return n}():Qe)+">"+(e||Qe)+"</div>"}function mi(t,e){for(var n,r=e.split(nn),i=0;i<r.length;i++){if(!t.hasOwnProperty(r[i]))return;n=t[r[i]],i<r.length&&Oi(n)==c.o&&(t=n)}return n}function wi(t,e,n){for(var i=e.split(nn),o=i.length,a=0,s={},c=s;a<o;a++)s=s[i[a]]=a+1<o?{}:n;r.extend(t,c,!0)}function bi(t,e,r){return!0===r?r:e===n||t!==e}function gi(t,e,r,i,o){if(!0===o)return o;if(i===n&&o===n){if(!0===r)return r;r=n}return r=r===n?"w":r,i=i===n?"h":i,e===n||(t[r]!==e[r]||t[i]!==e[i])}function Si(t,e){return e===n||(t.t!==e.t||t.r!==e.r||t.b!==e.b||t.l!==e.l)}function Oi(t){return r.type(t)}function zi(){return r.extend.apply(this,arguments)}function Mi(t,e){return r.prototype.addClass.call(t,e)}function Wi(t,e){return r.prototype.removeClass.call(t,e)}function Hi(t){return r.prototype.remove.call(t)}function Ai(t,e){return r.prototype.find.call(t,e).eq(0)}function Ci(t,n,o){if(X=d.defaultOptions,g=d.nativeScrollbarStyling,O=zi(!0,{},d.nativeScrollbarSize),y=zi(!0,{},d.nativeScrollbarIsOverlaid),x=zi(!0,{},d.overlayScrollbarDummySize),m=zi(!0,{},d.rtlScrollBehavior),$r(zi(!0,{},X,n)),y.x&&y.x&&!K.nativeScrollbarsOverlaid.initialize)return ci("onInitializationWithdrawn"),!1;var a;if(S=d.cssCalc,b=d.msie,w=d.autoUpdateRecommended,M=d.supportTransition,W=d.supportTransform,H=d.supportPassiveEvents,A=d.supportResizeObserver,de=d.supportMutationObserver,C=d.restrictedMeasuring,Z=r(t.ownerDocument),G=r(Z[0].defaultView||Z[0].parentWindow),$=Ai(Z,"html"),tt=Ai($,"body"),et=r(t),E=et.is("textarea"),L=et.is("body"),P=Z[0]!==e,L&&((a={}).l=Math.max(et[cn](),$[cn](),G[cn]()),a.t=Math.max(et[ln](),$[ln](),G[ln]())),E){et.wrap(xi(On)),Mi(et,Ln+rn+Xn),nt=et.parent();var s={};K.sizeAutoCapable||(s[Ye]=et.css(Ye),s[Ke]=et.css(Ke)),nt.css(s).wrapInner(xi(In+rn+Xn)).wrapInner(xi(Rn+rn+Xn)).wrapInner(xi(Dn+rn+Xn)),lt=Ai(nt,nn+In),st=Ai(nt,nn+Rn),at=Ai(nt,nn+Dn),ut=r(xi(Pn)),lt.prepend(ut),et.on(Ze,Ir).on("drop",Rr).on("focus",Nr).on("focusout",Fr),b>9||!w?et.on("input",Lr):et.on(pn,Pr).on(yn,Dr)}else Mi(et,Sn),(nt=et).wrapInner(xi(In)).wrapInner(xi(Rn)).wrapInner(xi(Dn)),lt=Ai(nt,nn+In),st=Ai(nt,nn+Rn),at=Ai(nt,nn+Dn),lt.on(mn,function(t){!0!==Ft&&Qr((t=t.originalEvent||t).propertyName)&&Zr(Ge)});if(ti(),H?wr(st,Ze,kr):st.on(Ze,kr),g&&Mi(st,y.x&&y.y?Fn:Nn),de){var u,f,h,v,p,z,D=i.mO(),R=i.now();ue=new D(function(t){if(T&&!B){var e,n=!1;r.each(t,function(){if(u=(e=this).target,f=e.attributeName,n=f===l.c?Xr(e.oldValue,u.className):f!==l.s||e.oldValue!==u[l.s].cssText)return!1}),n&&Te.update(Ge)}}),fe=new D(function(t){if(T&&!B){var e=!1;r.each(t,function(){return!(e=Yr(this))}),e&&(v=i.now(),p=zt||Ot,z=function(){k||(R=v,E&&Gr(),p?Te.update():Te.update(Ge))},clearTimeout(h),vr<=0||v-R>vr||!p?z():h=setTimeout(z,vr))}})}return L&&(Mi($,gn),st[cn](a.l),st[ln](a.t)),it=r(xi("os-resize-observer-host")),nt.prepend(it),gr(it,Hr),Hr(),Te.update(Ge),setTimeout(function(){M&&!k&&Mi(nt,Wn)},333),T=!0,ci("onInitialized"),Oi(o)==c.s&&(o=[o]),r.isArray(o)?r.each(o,function(){Te.addExt(this)}):r.isPlainObject(o)&&r.each(o,function(t,e){Te.addExt(t,e)}),T}}return t[s]=function(e,i,c){if(0===arguments.length)return this;M();var l,f,h=[];return r.isPlainObject(i)?e&&e.length?(r.each(e,function(){(l=this)!==n&&h.push(A(l,i,c,a,u))}),f=h.length>1?h:h[0]):f=A(e,i,c,a,u):e&&(e.length&&e.length>0?(r.each(e,function(){l=o(this),"!"===i?l instanceof t[s]&&h.push(l):h.push(l)}),f=h.length>1?h:h[0]):f=o(e)),f},t[s].globals=function(){M();var t=r.extend(!0,{},a);return delete t.msie,t},t[s].defaultOptions=function(t){M();var e=a.defaultOptions;if(t===n)return r.extend(!0,{},e);a.defaultOptions=r.extend(!0,{},e,z.v(t,z.t,!0))},t[s].extension=function(t,e,n){var i=r.type(t)==c.s,o=arguments[l.l],a=0;if(o<1||!i)return r.extend(!0,{length:O[l.l]},O);if(i)if(r.type(e)==c.f)O.push({name:t,extension:e,defaultOptions:n});else for(;a<O[l.l];a++)if(O[a].name===t){if(!(o>1))return r.extend(!0,{},O[a]);O.splice(a,1)}},t[s]}(r,u,(i=u,o=[],a="__overlayScrollbars__",function(t,e){var n=arguments[l.l];if(n<1)return o;if(e)t[a]=e,o.push(t);else{var r=i.inA(t,o);if(r>-1){if(!(n>1))return o[r][a];delete t[a],o.splice(r,1)}}}));return f&&f.fn&&(f.fn.overlayScrollbars=function(t,e){var n=this;return f.isPlainObject(t)?(f.each(n,function(){h(this,t,e)}),n):h(n,t)}),h});


/*global jQuery */
/*!
* Lettering.JS 0.7.0
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
	function injector(t, splitter, klass, after) {
		var text = t.text()
		, a = text.split(splitter)
		, inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
			});
			t.attr('aria-label',text)
			.empty()
			.append(inject)

		}
	}


	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},

		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replace all <br/> instances with an md5 hash
				// (of the word "split").  If you're trying to use this plugin on that
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);


/**
 * Copyright (c) 2007 Ariel Flesler - aflesler ○ gmail • com | https://github.com/flesler
 * Licensed under MIT
 * @author Ariel Flesler
 * @version 2.1.2
 */
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);case "object":if(e.length===0)return;if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});




/*
 * debouncedresize: special jQuery event that happens once after a window resize
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery-smartresize
 *
 * Copyright 2012 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work? 
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 */
(function($) {

var $event = $.event,
	$special,
	resizeTimeout;

$special = $event.special.debouncedresize = {
	setup: function() {
		$( this ).on( "resize", $special.handler );
	},
	teardown: function() {
		$( this ).off( "resize", $special.handler );
	},
	handler: function( event, execAsap ) {
		// Save the context
		var context = this,
			args = arguments,
			dispatch = function() {
				// set correct event type
				event.type = "debouncedresize";
				$event.dispatch.apply( context, args );
			};

		if ( resizeTimeout ) {
			clearTimeout( resizeTimeout );
		}

		execAsap ?
			dispatch() :
			resizeTimeout = setTimeout( dispatch, $special.threshold );
	},
	threshold: 150
};

})(jQuery);


/**
 * jQuery alterClass plugin
 *
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 *
 * Copyright (c) 2011 Pete Boere (the-echoplex.net)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ( $ ) {
	
$.fn.alterClass = function ( removals, additions ) {
	
	var self = this;
	
	if ( removals.indexOf( '*' ) === -1 ) {
		// Use native jQuery methods if there is no wildcard matching
		self.removeClass( removals );
		return !additions ? self : self.addClass( additions );
	}

	var patt = new RegExp( '\\s' + 
			removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) + 
			'\\s', 'g' );

	self.each( function ( i, it ) {
		var cn = ' ' + it.className + ' ';
		while ( patt.test( cn ) ) {
			cn = cn.replace( patt, ' ' );
		}
		it.className = $.trim( cn );
	});

	return !additions ? self : self.addClass( additions );
};

})( jQuery );


/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader;
	if (typeof define === 'function' && define.amd) {
		define(factory);
		registeredInModuleLoader = true;
	}
	if (typeof exports === 'object') {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function decode (s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}

	function init (converter) {
		function api() {}

		function set (key, value, attributes) {
			if (typeof document === 'undefined') {
				return;
			}

			attributes = extend({
				path: '/'
			}, api.defaults, attributes);

			if (typeof attributes.expires === 'number') {
				attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
			}

			// We're using "expires" because "max-age" is not supported by IE
			attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

			try {
				var result = JSON.stringify(value);
				if (/^[\{\[]/.test(result)) {
					value = result;
				}
			} catch (e) {}

			value = converter.write ?
				converter.write(value, key) :
				encodeURIComponent(String(value))
					.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

			key = encodeURIComponent(String(key))
				.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
				.replace(/[\(\)]/g, escape);

			var stringifiedAttributes = '';
			for (var attributeName in attributes) {
				if (!attributes[attributeName]) {
					continue;
				}
				stringifiedAttributes += '; ' + attributeName;
				if (attributes[attributeName] === true) {
					continue;
				}

				// Considers RFC 6265 section 5.2:
				// ...
				// 3.  If the remaining unparsed-attributes contains a %x3B (";")
				//     character:
				// Consume the characters of the unparsed-attributes up to,
				// not including, the first %x3B (";") character.
				// ...
				stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
			}

			return (document.cookie = key + '=' + value + stringifiedAttributes);
		}

		function get (key, json) {
			if (typeof document === 'undefined') {
				return;
			}

			var jar = {};
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all.
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = decode(parts[0]);
					cookie = (converter.read || converter)(cookie, name) ||
						decode(cookie);

					if (json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					jar[name] = cookie;

					if (key === name) {
						break;
					}
				} catch (e) {}
			}

			return key ? jar[key] : jar;
		}

		api.set = set;
		api.get = function (key) {
			return get(key, false /* read as raw */);
		};
		api.getJSON = function (key) {
			return get(key, true /* read as json */);
		};
		api.remove = function (key, attributes) {
			set(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.defaults = {};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


// Tocca.min.js
var JUST_ON_TOUCH_DEVICES = true;
!function(doc,win){if("function"!=typeof doc.createEvent)return!1;var pointerId,currX,currY,cachedX,cachedY,timestamp,target,dblTapTimer,longtapTimer,pointerEvent=function(type){var lo=type.toLowerCase(),ms="MS"+type;return navigator.msPointerEnabled?ms:!!window.PointerEvent&&lo},touchEvent=function(name){return"on"+name in window&&name},defaults={useJquery:!win.IGNORE_JQUERY&&"undefined"!=typeof jQuery,swipeThreshold:win.SWIPE_THRESHOLD||100,tapThreshold:win.TAP_THRESHOLD||150,dbltapThreshold:win.DBL_TAP_THRESHOLD||200,longtapThreshold:win.LONG_TAP_THRESHOLD||1e3,tapPrecision:win.TAP_PRECISION/2||30,justTouchEvents:win.JUST_ON_TOUCH_DEVICES},wasTouch=!1,touchevents={touchstart:touchEvent("touchstart")||pointerEvent("PointerDown"),touchend:touchEvent("touchend")||pointerEvent("PointerUp"),touchmove:touchEvent("touchmove")||pointerEvent("PointerMove")},isTheSameFingerId=function(e){return!e.pointerId||void 0===pointerId||e.pointerId===pointerId},setListener=function(elm,events,callback){for(var eventsArray=events.split(" "),i=eventsArray.length;i--;)elm.addEventListener(eventsArray[i],callback,!1)},getPointerEvent=function(event){return event.targetTouches?event.targetTouches[0]:event},getTimestamp=function(){return(new Date).getTime()},sendEvent=function(elm,eventName,originalEvent,data){var customEvent=doc.createEvent("Event");if(customEvent.originalEvent=originalEvent,data=data||{},data.x=currX,data.y=currY,data.distance=data.distance,defaults.useJquery&&(customEvent=jQuery.Event(eventName,{originalEvent:originalEvent}),jQuery(elm).trigger(customEvent,data)),customEvent.initEvent){for(var key in data)customEvent[key]=data[key];customEvent.initEvent(eventName,!0,!0),elm.dispatchEvent(customEvent)}for(;elm;)elm["on"+eventName]&&elm["on"+eventName](customEvent),elm=elm.parentNode},onTouchStart=function(e){if(isTheSameFingerId(e)&&(pointerId=e.pointerId,"mousedown"!==e.type&&(wasTouch=!0),"mousedown"!==e.type||!wasTouch)){var pointer=getPointerEvent(e);cachedX=currX=pointer.pageX,cachedY=currY=pointer.pageY,longtapTimer=setTimeout(function(){sendEvent(e.target,"longtap",e),target=e.target},defaults.longtapThreshold),timestamp=getTimestamp(),tapNum++}},onTouchEnd=function(e){if(isTheSameFingerId(e)){if(pointerId=void 0,"mouseup"===e.type&&wasTouch)return void(wasTouch=!1);var eventsArr=[],now=getTimestamp(),deltaY=cachedY-currY,deltaX=cachedX-currX;if(clearTimeout(dblTapTimer),clearTimeout(longtapTimer),deltaX<=-defaults.swipeThreshold&&eventsArr.push("swiperight"),deltaX>=defaults.swipeThreshold&&eventsArr.push("swipeleft"),deltaY<=-defaults.swipeThreshold&&eventsArr.push("swipedown"),deltaY>=defaults.swipeThreshold&&eventsArr.push("swipeup"),eventsArr.length){for(var i=0;i<eventsArr.length;i++){var eventName=eventsArr[i];sendEvent(e.target,eventName,e,{distance:{x:Math.abs(deltaX),y:Math.abs(deltaY)}})}tapNum=0}else cachedX>=currX-defaults.tapPrecision&&cachedX<=currX+defaults.tapPrecision&&cachedY>=currY-defaults.tapPrecision&&cachedY<=currY+defaults.tapPrecision&&timestamp+defaults.tapThreshold-now>=0&&(sendEvent(e.target,tapNum>=2&&target===e.target?"dbltap":"tap",e),target=e.target),dblTapTimer=setTimeout(function(){tapNum=0},defaults.dbltapThreshold)}},onTouchMove=function(e){if(isTheSameFingerId(e)&&("mousemove"!==e.type||!wasTouch)){var pointer=getPointerEvent(e);currX=pointer.pageX,currY=pointer.pageY}},tapNum=0;setListener(doc,touchevents.touchstart+(defaults.justTouchEvents?"":" mousedown"),onTouchStart),setListener(doc,touchevents.touchend+(defaults.justTouchEvents?"":" mouseup"),onTouchEnd),setListener(doc,touchevents.touchmove+(defaults.justTouchEvents?"":" mousemove"),onTouchMove),win.tocca=function(options){for(var opt in options)defaults[opt]=options[opt];return defaults}}(document,window);