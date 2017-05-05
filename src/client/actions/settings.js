import { SETTING_LOADING, SETTING_LOADING_SUCCESS, SETTING_ERROR, SETTING_SAVING, SETTING_SAVING_SUCCESS, SETTING_RESET } from '../reducers/constants';

const load = () => ({
  type: SETTING_LOADING,
});

const loaded = data => ({
  type: SETTING_LOADING_SUCCESS,
  data,
});

const save = () => ({
  type: SETTING_SAVING,
});

const saved = data => ({
  type: SETTING_SAVING_SUCCESS,
  data,
});

const error = errorData => ({
  type: SETTING_ERROR,
  error: errorData.error,
});

const reset = () => ({
  type: SETTING_RESET,
});

export default { load, loaded, save, saved, error, reset };
