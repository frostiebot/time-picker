webpackJsonp([4],{

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(99);


/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
throw new Error("Cannot find module \"rc-time-picker/assets/index.less\"");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
throw new Error("Cannot find module \"moment\"");
throw new Error("Cannot find module \"rc-time-picker\"");
/* eslint no-console:0 */










var showSecond = true;
var str = showSecond ? 'HH:mm:ss' : 'HH:mm';

function onChange(value) {
  console.log(value && value.format(str));
}

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_rc_time_picker___default.a, {
  format: str,
  showSecond: showSecond
  // use to control utfOffset, locale, default open value
  , defaultOpenValue: __WEBPACK_IMPORTED_MODULE_3_moment___default()(),
  className: 'xxx',
  onChange: onChange,
  disabledHours: function disabledHours() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 22, 23];
  },
  disabledMinutes: function disabledMinutes() {
    return [0, 2, 4, 6, 8];
  },
  hideDisabledOptions: true
}), document.getElementById('__react-content'));

/***/ })

},[118]);
//# sourceMappingURL=hidden.js.map