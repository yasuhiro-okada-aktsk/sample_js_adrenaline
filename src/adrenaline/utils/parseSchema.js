'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = parseSchema;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodash = require('lodash');

var _graphql = require('graphql');

function parseSchema(schema) {
  var typeMap = schema.getTypeMap();
  var userTypes = (0, _lodash.reduce)(typeMap, function (acc, val, key) {
    if (key.startsWith('__')) return acc;
    if (isScalar(val) || isEnum(val) || isNested(val)) return acc;

    return _extends({}, acc, _defineProperty({}, key, _extends({}, (0, _lodash.reduce)(val.getFields(), function (memo, field, name) {
      var typename = parseType(field.type);
      return typename ? _extends({}, memo, _defineProperty({}, name, typename)) : memo;
    }, {}))));
  }, {});
  return userTypes;
}

function parseType(_x) {
  var _again = true;

  _function: while (_again) {
    var type = _x;
    childType = undefined;
    _again = false;

    if (isDefined(type) && !isNested(type)) return type.name;
    if (isComplex(type)) {
      _x = type.ofType;
      _again = true;
      continue _function;
    }
    if (isList(type)) {
      var childType = type.ofType;
      if (isDefined(childType) && !isNested(childType)) return [childType.name];
    }
  }
}

function isComplex(type) {
  return type instanceof _graphql.GraphQLNonNull;
}

function isList(type) {
  return type instanceof _graphql.GraphQLList;
}

function isScalar(type) {
  return type instanceof _graphql.GraphQLScalarType;
}

function isEnum(type) {
  return type instanceof _graphql.GraphQLEnumType;
}

function isDefined(type) {
  return !(isList(type) || isComplex(type) || isScalar(type));
}

function isNested(type) {
  return !isScalar(type) && !isEnum(type) && !type.getFields().hasOwnProperty('id') && type.name !== 'Query' && type.name !== 'Mutation';
}
module.exports = exports['default'];