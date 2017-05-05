import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';

import settings from './settings';
import hdo from './hdo';

export default combineReducers({
  settings,
  hdo,
  form: reduxFormReducer,
});
