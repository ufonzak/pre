import React from 'react';
import { Provider } from 'react-redux';

import Router from './Router';
import store from '../store';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
