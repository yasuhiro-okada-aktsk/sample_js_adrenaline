/* @flow */

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './routes';
import { Adrenaline } from 'adrenaline';
import schema from 'shared/schema';
import Loader from './components/Loader';
import {finalCreateStore as createStore} from './store/createStore'

console.log(schema.getTypeMap());

const rootNode = document.getElementById('root');
ReactDOM.render(
  <Adrenaline schema={schema} renderLoading={Loader} createStore={createStore} >
    {() => <Router history={history} children={routes} />}
  </Adrenaline>,
  rootNode
);
