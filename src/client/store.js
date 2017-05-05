import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer,
  window && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // eslint-disable-line

store.subscribe(() => {
  console.log(store.getState());
});

export default store;
