'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = createCache;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _redux = require('redux');

var _utilsMerge = require('../utils/merge');

var _utilsMerge2 = _interopRequireDefault(_utilsMerge);

var _constants = require('../constants');

function createCache(parsedSchema) {
  var composedStore = arguments.length <= 1 || arguments[1] === undefined ? _redux.createStore : arguments[1];

  var reducer = (0, _redux.combineReducers)(Object.keys(parsedSchema).reduce(function (acc, key) {
    return _extends({}, acc, _defineProperty({}, key, createReducer(key)));
  }, {}));
  return composedStore(reducer);
}

function createReducer(key) {
  return function (state, action) {
    if (state === undefined) state = {};
    var type = action.type;
    var payload = action.payload;
    var error = action.error;

    if (error) {
      return state;
    }

    if (type === _constants.UPDATE_CACHE) {
      return (0, _utilsMerge2['default'])(state, payload[key] || {});
    }

    return state;
  };
}
module.exports = exports['default'];