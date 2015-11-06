'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Loading = require('./Loading');

var _Loading2 = _interopRequireDefault(_Loading);

var _utilsParseSchema = require('../utils/parseSchema');

var _utilsParseSchema2 = _interopRequireDefault(_utilsParseSchema);

var _storeCreateStoreShape = require('../store/createStoreShape');

var _storeCreateStoreShape2 = _interopRequireDefault(_storeCreateStoreShape);

var _storeCreateCacheStore = require('../store/createCacheStore');

var _storeCreateCacheStore2 = _interopRequireDefault(_storeCreateCacheStore);

var _networkRequest = require('../network/request');

var _networkRequest2 = _interopRequireDefault(_networkRequest);

var _utilsNormalize = require('../utils/normalize');

var _utilsNormalize2 = _interopRequireDefault(_utilsNormalize);

var _constants = require('../constants');

var Adrenaline = (function (_Component) {
  _inherits(Adrenaline, _Component);

  _createClass(Adrenaline, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this.store,
        Loading: this.props.renderLoading,
        schema: this.props.schema,
        performQuery: this.performQuery.bind(this),
        performMutation: this.performMutation.bind(this)
      };
    }
  }], [{
    key: 'childContextTypes',
    value: {
      store: (0, _storeCreateStoreShape2['default'])(_react.PropTypes).isRequired,
      Loading: _react.PropTypes.func.isRequired,
      schema: _react.PropTypes.object.isRequired,
      performQuery: _react.PropTypes.func.isRequired,
      performMutation: _react.PropTypes.func.isRequired
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      children: _react.PropTypes.func.isRequired,
      createStore: _react.PropTypes.func,
      endpoint: _react.PropTypes.string,
      renderLoading: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      renderLoading: _Loading2['default'],
      endpoint: '/graphql'
    },
    enumerable: true
  }]);

  function Adrenaline(props, context) {
    _classCallCheck(this, Adrenaline);

    _get(Object.getPrototypeOf(Adrenaline.prototype), 'constructor', this).call(this, props, context);

    this.parsedSchema = (0, _utilsParseSchema2['default'])(props.schema);
    this.store = (0, _storeCreateCacheStore2['default'])(this.parsedSchema, props.createStore);
  }

  _createClass(Adrenaline, [{
    key: 'performQuery',
    value: function performQuery(query, params) {
      var endpoint = this.props.endpoint;
      var parsedSchema = this.parsedSchema;
      var store = this.store;
      var dispatch = store.dispatch;

      (0, _networkRequest2['default'])(endpoint, { query: query, params: params }).then(function (json) {
        dispatch({
          type: _constants.UPDATE_CACHE,
          payload: (0, _utilsNormalize2['default'])(parsedSchema, json.data)
        });
      })['catch'](function (err) {
        dispatch({ type: _constants.UPDATE_CACHE, payload: err, error: true });
      });
    }
  }, {
    key: 'performMutation',
    value: function performMutation(_ref, params, files) {
      var mutation = _ref.mutation;
      var _ref$updateCache = _ref.updateCache;
      var updateCache = _ref$updateCache === undefined ? [] : _ref$updateCache;

      (0, _invariant2['default'])(mutation !== undefined && mutation !== null, 'You have to declare "mutation" field in your mutation');

      var endpoint = this.props.endpoint;
      var parsedSchema = this.parsedSchema;
      var store = this.store;
      var dispatch = store.dispatch;

      (0, _networkRequest2['default'])(endpoint, { mutation: mutation, params: params }, files).then(function (json) {
        var payload = (0, _utilsNormalize2['default'])(parsedSchema, json.data);
        dispatch({ type: _constants.UPDATE_CACHE, payload: payload });

        updateCache.forEach(function (fn) {
          var _fn = fn(Object.values(json.data)[0]);

          var parentId = _fn.parentId;
          var parentType = _fn.parentType;
          var resolve = _fn.resolve;

          var state = store.getState();
          var parent = state[parentType][parentId];
          if (!parent) return;
          dispatch({
            type: _constants.UPDATE_CACHE,
            payload: _defineProperty({}, parentType, _defineProperty({}, parent.id, resolve(parent)))
          });
        });
      })['catch'](function (err) {
        dispatch({ type: _constants.UPDATE_CACHE, payload: err, error: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return children();
    }
  }]);

  return Adrenaline;
})(_react.Component);

exports['default'] = Adrenaline;
module.exports = exports['default'];