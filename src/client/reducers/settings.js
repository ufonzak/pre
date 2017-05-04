import {
  SETTING_LOADING,
  SETTING_LOADING_SUCCESS,
  SETTING_ERROR,
  SETTING_SAVING,
  SETTING_SAVING_SUCCESS,
  SETTING_RESET,
} from './constants';

const initial = { data: null, loading: false, saving: false, error: null };

export default (state = initial, { type, data, loading, saving, error }) => { // eslint-disable-line no-unused-vars
  switch (type) {
    case SETTING_LOADING:
      return { ...state, data: null, loading: true, error: null };
    case SETTING_LOADING_SUCCESS:
      return { ...state, data, loading: false };
    case SETTING_SAVING:
      return { ...state, saving: true, error: null };
    case SETTING_SAVING_SUCCESS:
      return { ...state, saving: false };
    case SETTING_ERROR:
      return { ...state, loading: false, saving: false, error };
    case SETTING_RESET:
      return initial;
    default:
      return state;
  }
};
