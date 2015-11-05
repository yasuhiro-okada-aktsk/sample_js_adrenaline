/* @flow */

import React, { Component, PropTypes, findDOMNode } from 'react';

const ENTER_KEY_CODE = 13;

export default class TodoInput extends Component {
  static propTypes = {
    createTodo: PropTypes.func.isRequired,
  }

  onEnter = (e) => {
    const input = findDOMNode(this.refs.input);
    if (!input.value.length) return;
    if (e.keyCode === ENTER_KEY_CODE) {
      this.props.createTodo({ text: input.value });
      input.value = '';
    }
  }

  render() {
    return (
      <input
        ref="input"
        type="text"
        onKeyDown={this.onEnter}
        autoFocus="true"
      />
    );
  }
}
