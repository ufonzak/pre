import React from 'react';
import Router from './Router';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    console.log('fetching...');
    const test = async () => {
      const response = await fetch('/hello');
      const data = await response.json();
      this._data = data;
      console.log(data);
    };
    test();
  }

  render() {
    return (<Router />);
  }
}
