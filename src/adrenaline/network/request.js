'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = request;

function request(endpoint, data, files) {
  if (!files) {
    return fetch(endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: data.query || data.mutation,
        variables: data.params
      })
    }).then(parseJSON);
  }

  var formData = new FormData();
  formData.append('query', data.mutation);
  formData.append('variables', JSON.stringify(data.params));
  if (files) {
    for (var filename in files) {
      if (files.hasOwnProperty(filename)) {
        formData.append(filename, files[filename]);
      }
    }
  }
  return fetch(endpoint, {
    method: 'post',
    body: formData
  }).then(parseJSON);

  throw new Error('Unsupported request');
}

function parseJSON(res) {
  return res.json();
}
module.exports = exports['default'];