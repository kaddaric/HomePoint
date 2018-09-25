import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import * as moment from 'moment';

import Home from './components/Home';
import Collaborators from './containers/Collaborators';
import Clients from './containers/Clients';
import CollaboratorAdd from './containers/CollaboratorAdd';
import CollaboratorModify from './containers/CollaboratorModify';
import ClientFormAdd from './containers/ClientFormAdd';
import ClientFormModify from './containers/ClientFormModify';
import Users from './containers/Users';
import Skills from './containers/Skills';
import UserFormAdd from './containers/UserFormAdd';
import UserFormModify from './containers/UserFormModify';

import 'font-awesome/css/font-awesome.min.css';
import './index.css';

import insertCss from 'insert-css';
import css from 're-bulma/build/css';
import 'bootstrap/dist/css/bootstrap.min.css';

try {
  if (typeof document !== 'undefined' || document !== null) insertCss(css, { prepend: true });
} catch (e) { }


moment.locale('fr');

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/collaborators" component={Collaborators} />
          <Route path="/collaborators/add" component={CollaboratorAdd} />
          <Route path="/collaborators/modify" component={CollaboratorModify} />
          <Route path="/skills" component={Skills} />
          <Route path="/clients/add" component={ClientFormAdd} />
          <Route path="/clients/modify" component={ClientFormModify} />
          <Route exact path="/clients" component={Clients} />
          <Route path="/users/add" component={UserFormAdd} />
          <Route path="/users/modify" component={UserFormModify} />
          <Route path="/users" component={Users} />
        </Switch>
      </BrowserRouter>
    </div>
  </Provider>,
  document.getElementById('root'),
);
