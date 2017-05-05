export const SETTING_LOADING = 'SETTING_LOADING';
export const SETTING_SAVING = 'SETTING_SAVING';
export const SETTING_LOADING_SUCCESS = 'SETTING_LOADING_SUCCESS';
export const SETTING_SAVING_SUCCESS = 'SETTING_SAVING_SUCCESS';
export const SETTING_ERROR = 'SETTING_ERROR';
export const SETTING_RESET = 'SETTING_RESET';

const initial = { data: null, loading: false, saving: false, saved: false, error: null };

export default (state = initial, { type, data, loading, saving, error }) => { // eslint-disable-line no-unused-vars
  switch (type) {
    case SETTING_LOADING:
      return { ...state, ...initial, loading: true };
    case SETTING_LOADING_SUCCESS:
      return { ...state, data, loading: false };
    case SETTING_SAVING:
      return { ...state, saving: true, saved: false, error: null };
    case SETTING_SAVING_SUCCESS:
      return { ...state, data, saving: false, saved: true };
    case SETTING_ERROR:
      return { ...state, loading: false, saving: false, error };
    case SETTING_RESET:
      return initial;
    default:
      return state;
  }
};
