'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isPlainObject;

function isPlainObject(obj) {
  return obj ? typeof obj === 'object' && Object.getPrototypeOf(obj) === Object.prototype : false;
}

module.exports = exports['default'];