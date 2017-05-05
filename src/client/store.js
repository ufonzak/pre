import { createStore } from 'redux';
import reducer from './reducers/reducer';

const store = createStore(reducer,
  window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line

export default store;
