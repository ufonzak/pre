import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import settings from './settings';

export default combineReducers({
  settings,
  form: reduxFormReducer,
});
