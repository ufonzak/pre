import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import store from '../store';
import Hdo from './Hdo';
import Home from './Home';
import Settings from '../containers/Settings';

export default () => (
  <Provider store={store}>
    <Router>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hdo">Hdo</Link></li>
          <li><Link to="/settings">Settings</Link></li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/hdo" component={Hdo} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  </Provider>
);
