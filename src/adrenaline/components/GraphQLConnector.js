'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _storeCreateStoreShape = require('../store/createStoreShape');

var _storeCreateStoreShape2 = _interopRequireDefault(_storeCreateStoreShape);

var _utilsShallowEqual = require('../utils/shallowEqual');

var _utilsShallowEqual2 = _interopRequireDefault(_utilsShallowEqual);

var _graphql = require('graphql');

var GraphQLConnector = (function (_Component) {
  _inherits(GraphQLConnector, _Component);

  _createClass(GraphQLConnector, null, [{
    key: 'contextTypes',
    value: {
      store: (0, _storeCreateStoreShape2['default'])(_react.PropTypes).isRequired,
      schema: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'propTypes',
    value: {
      children: _react.PropTypes.func.isRequired,
      select: _react.PropTypes.func.isRequired,
      query: _react.PropTypes.string.isRequired,
      variables: _react.PropTypes.object.isRequired
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      select: function select(state) {
        return state;
      }
    },
    enumerable: true
  }]);

  function GraphQLConnector(props, context) {
    _classCallCheck(this, GraphQLConnector);

    _get(Object.getPrototypeOf(GraphQLConnector.prototype), 'constructor', this).call(this, props, context);
    this.state = this.selectState(props, context);
  }

  _createClass(GraphQLConnector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var store = this.context.store;

      this.unsubscribe = store.subscribe(this.handleChange.bind(this));
      this.handleChange();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.variables !== this.props.variables) {
        this.handleChange(nextProps);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      return !this.isSliceEqual(this.state.slice, nextState.slice) || !(0, _utilsShallowEqual2['default'])(this.props, nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.unsubscribe();
    }
  }, {
    key: 'isSliceEqual',
    value: function isSliceEqual(slice, nextSlice) {
      var isRefEqual = slice === nextSlice;
      if (isRefEqual) {
        return true;
      } else if (typeof slice !== 'object' || typeof nextSlice !== 'object') {
        return isRefEqual;
      }
      return (0, _utilsShallowEqual2['default'])(slice, nextSlice);
    }
  }, {
    key: 'handleChange',
    value: function handleChange() {
      var _this = this;

      var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];

      this.selectState(props, this.context).then(function (nextState) {
        if (!_this.isSliceEqual(_this.state.slice, nextState.slice)) {
          _this.setState(nextState);
        }
      })['catch'](function (err) {
        return console.error(err.message, err.stack);
      });
    }
  }, {
    key: 'selectState',
    value: function selectState(props, context) {
      var state = context.store.getState();

      var schema = this.context.schema;
      var query = props.query;
      var variables = props.variables;

      return (0, _graphql.graphql)(schema, query, state, variables).then(function (_ref) {
        var slice = _ref.data;
        return { slice: slice };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;
      var slice = this.state.slice;
      var dispatch = this.context.store.dispatch;

      return children(_extends({ dispatch: dispatch }, slice));
    }
  }]);

  return GraphQLConnector;
})(_react.Component);

exports['default'] = GraphQLConnector;
module.exports = exports['default'];