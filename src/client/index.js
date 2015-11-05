/* @flow */

import 'whatwg-fetch';
import React from 'react';
import { Router } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import routes from './routes';
import { Adrenaline } from 'adrenaline';
import schema from 'shared/schema';
import Loader from './components/Loader';

console.log(schema.getTypeMap());

const rootNode = document.getElementById('root');
React.render(
  <Adrenaline schema={schema} renderLoading={Loader}>
    {() => <Router history={history} children={routes} />}
  </Adrenaline>,
  rootNode
);
