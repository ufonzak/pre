import { combineReducers } from 'redux';
import { SETTING_LOADING, SETTING_LOADING_SUCESS, SETTING_LOADING_ERROR } from './constants';
// import deepFreeze from 'deep-freeze';

const settings = (state = {}, { type, data, loading, error }) => { // eslint-disable-line no-unused-vars
  switch (type) {
    case SETTING_LOADING:
      return { data: null, loading: true, error: null };
    case SETTING_LOADING_SUCESS:
      return { ...state, data, loading: false };
    case SETTING_LOADING_ERROR:
      return { ...state, loading: false, error };
    default: return state;
  }
};

export default combineReducers({ settings });
