'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = merge;

var _lodash = require('lodash');

function merge(objA, objB) {
  var dst = _extends({}, objA);
  for (var key in objB) {
    if (objB.hasOwnProperty(key)) {
      dst[key] = dst[key] || {};
      mergeOne(dst[key], objB[key]);
    }
  }
  return dst;
}

function mergeOne(objA, objB) {
  for (var key in objB) {
    if (!objB.hasOwnProperty(key)) {
      continue;
    }
    objA[key] = objB[key];
  }
}
module.exports = exports['default'];