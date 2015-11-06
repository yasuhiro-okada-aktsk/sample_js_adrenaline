'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createSmartComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _lodash = require('lodash');

var _GraphQLConnector = require('./GraphQLConnector');

var _GraphQLConnector2 = _interopRequireDefault(_GraphQLConnector);

var _utilsShadowEqualScalar = require('../utils/shadowEqualScalar');

var _utilsShadowEqualScalar2 = _interopRequireDefault(_utilsShadowEqualScalar);

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

function createSmartComponent(DecoratedComponent, specs) {
  var displayName = 'SmartComponent(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')';

  return (function (_Component) {
    _inherits(_class, _Component);

    _createClass(_class, null, [{
      key: 'displayName',
      value: displayName,
      enumerable: true
    }, {
      key: 'DecoratedComponent',
      value: DecoratedComponent,
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        Loading: _react.PropTypes.func.isRequired,
        performQuery: _react.PropTypes.func.isRequired,
        performMutation: _react.PropTypes.func.isRequired
      },
      enumerable: true
    }]);

    function _class(props, context) {
      var _this = this;

      _classCallCheck(this, _class);

      _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).call(this, props, context);
      var initialArgs = specs.initialArgs || {};
      this.state = (0, _lodash.isFunction)(initialArgs) ? initialArgs(props) : initialArgs;

      DecoratedComponent.prototype.setArgs = function (nextArgs) {
        _this.setState(nextArgs, function () {
          return _this.fetch();
        });
      };

      this.mutations = (0, _lodash.mapValues)(specs.mutations, function (m) {
        return function (params, files) {
          return _this.context.performMutation(m, params, files);
        };
      });

      this.fetch();
    }

    /*shouldComponentUpdate(nextProps) {
      return !shadowEqualScalar(this.props, nextProps);
    }*/

    _createClass(_class, [{
      key: 'fetch',
      value: function fetch() {
        var args = arguments.length <= 0 || arguments[0] === undefined ? this.state : arguments[0];
        var performQuery = this.context.performQuery;
        var query = specs.query;

        performQuery(query, args);
      }
    }, {
      key: 'renderDecoratedComponent',
      value: function renderDecoratedComponent(state) {
        (0, _invariant2['default'])(DecoratedComponent.propTypes !== undefined, 'You have to declare propTypes for %s', displayName);

        var propTypes = DecoratedComponent.propTypes;

        var requiredPropTypes = (0, _lodash.reduce)(propTypes, function (memo, val, key) {
          if (!val.hasOwnProperty('isRequired')) {
            return [].concat(_toConsumableArray(memo), [key]);
          }
          return memo;
        }, []);
        var dataLoaded = requiredPropTypes.every(function (key) {
          if (key === 'mutations') {
            return true;
          }
          return state.hasOwnProperty(key) && state[key] !== null;
        });

        var Loading = this.context.Loading;

        if (!dataLoaded) {
          return _react2['default'].createElement(Loading, null);
        }

        return _react2['default'].createElement(DecoratedComponent, _extends({}, this.props, state, {
          args: this.state,
          mutations: this.mutations }));
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(
          _GraphQLConnector2['default'],
          { query: specs.query, variables: this.state },
          this.renderDecoratedComponent.bind(this)
        );
      }
    }]);

    return _class;
  })(_react.Component);
}

module.exports = exports['default'];