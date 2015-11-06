import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';

export const finalCreateStore = compose(
  applyMiddleware(createLogger())
)(createStore);
