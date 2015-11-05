/* @flow */

import React, { Component, PropTypes, findDOMNode } from 'react';
import TodoList from 'client/components/TodoList';
import * as todoMutations from '../mutations/todo';
import { createSmartComponent } from 'adrenaline';

class TodoApp extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired,
    mutations: PropTypes.object.isRequired,
  }

  componentDidMount() {
    setTimeout(() => {
      this.setArgs({ count: 10 });
    }, 2000);
  }

  render() {
    const { viewer, mutations } = this.props;

    return (
      <TodoList todos={viewer.todos} mutations={mutations} />
    );
  }
}

export default createSmartComponent(TodoApp, {
  initialArgs: {
    count: 2,
  },
  query: `
    query TodoApp($count: Int) {
      viewer {
        id,
        ${TodoList.getFragment('todos')}
      }
    }
  `,
  mutations: {
    ...todoMutations,
  },
});
