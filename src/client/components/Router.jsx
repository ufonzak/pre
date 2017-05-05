import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import Hdo from './Hdo';
import Home from './Home';
import Settings from '../components/Settings';

export default () => (
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
);
