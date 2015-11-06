'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = createDumbComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _utilsGetDisplayName = require('../utils/getDisplayName');

var _utilsGetDisplayName2 = _interopRequireDefault(_utilsGetDisplayName);

var _lodash = require('lodash');

function createDumbComponent(DecoratedComponent, specs) {
  var displayName = 'DumbComponent(' + (0, _utilsGetDisplayName2['default'])(DecoratedComponent) + ')';

  (0, _invariant2['default'])(specs.hasOwnProperty('fragments'), '%s have not fragments declared', displayName);

  var fragments = specs.fragments;

  (0, _invariant2['default'])((0, _lodash.isObject)(fragments), 'Fragments have to be declared as object in %s', displayName);

  return (function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      _classCallCheck(this, _class);

      _get(Object.getPrototypeOf(_class.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(_class, [{
      key: 'render',
      value: function render() {
        return _react2['default'].createElement(DecoratedComponent, this.props);
      }
    }], [{
      key: 'getFragment',
      value: function getFragment(key) {
        (0, _invariant2['default'])((0, _lodash.isString)(key), 'You cant call getFragment(key: string) without string key in %s', displayName);

        (0, _invariant2['default'])(fragments.hasOwnProperty(key), 'Component %s has no fragment %s', displayName, key);

        return '... on ' + fragments[key].replace(/\s+/g, ' ').trim();
      }
    }, {
      key: 'displayName',
      value: displayName,
      enumerable: true
    }, {
      key: 'DecoratedComponent',
      value: DecoratedComponent,
      enumerable: true
    }]);

    return _class;
  })(_react.Component);
}

module.exports = exports['default'];