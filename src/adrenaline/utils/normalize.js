'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = normalize;

var _lodash = require('lodash');

function normalize(parsedSchema, data) {
  var keys = Object.keys(data);
  var isQuery = parsedSchema.hasOwnProperty('Query') && keys.every(function (key) {
    return parsedSchema.Query.hasOwnProperty(key);
  });
  var isMutation = parsedSchema.hasOwnProperty('Mutation') && keys.every(function (key) {
    return parsedSchema.Mutation.hasOwnProperty(key);
  });

  var bag = {};
  if (isQuery) {
    normalizeAny(parsedSchema, 'Query', bag, data);
  } else if (isMutation) {
    normalizeAny(parsedSchema, 'Mutation', bag, data);
  } else {
    throw new Error('Unrecognized GraphQL result');
  }

  return bag;
}

function normalizeAny(parsedSchema, typename, bag, data) {
  if (data === null || data === undefined) {
    return null;
  }

  if (typename === undefined) {
    return data;
  }

  if ((0, _lodash.isArray)(typename)) {
    return normalizeArray(parsedSchema, typename[0], bag, data);
  }

  if (!data.hasOwnProperty('id')) {
    return normalizeObject(parsedSchema, typename, bag, data);
  }

  return normalizeType(parsedSchema, typename, bag, data);
}

function normalizeArray(parsedSchema, typename, bag, data) {
  return data.map(function (item) {
    return normalizeAny(parsedSchema, typename, bag, item);
  });
}

function normalizeObject(parsedSchema, typename, bag, data) {
  var itemSchema = parsedSchema[typename];
  var normalized = {};
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var node = normalizeAny(parsedSchema, itemSchema[key], bag, data[key]);
      normalized[key] = node;
    }
  }
  return normalized;
}

function normalizeType(parsedSchema, typename, bag, data) {
  var id = data.id;

  if (!bag[typename]) {
    bag[typename] = {};
  }

  if (!bag[typename][id]) {
    bag[typename][id] = {};
  }

  var stored = bag[typename][id];
  var normalized = normalizeObject(parsedSchema, typename, bag, data);
  merge(stored, normalized);

  return id;
}

function merge(entityA, entityB) {
  for (var key in entityB) {
    if (!entityB.hasOwnProperty(key) || (0, _lodash.isEqual)(entityA[key], entityB[key])) {
      continue;
    }
    entityA[key] = entityB[key];
  }
}
module.exports = exports['default'];