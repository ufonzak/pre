import {
  SETTING_LOADING,
  SETTING_LOADING_SUCCESS,
  SETTING_ERROR,
  SETTING_SAVING,
  SETTING_SAVING_SUCCESS,
  SETTING_RESET,
} from '../reducers/settings';

export const load = () => ({
  type: SETTING_LOADING,
});

export const loaded = data => ({
  type: SETTING_LOADING_SUCCESS,
  data,
});

export const save = () => ({
  type: SETTING_SAVING,
});

export const saved = data => ({
  type: SETTING_SAVING_SUCCESS,
  data,
});

export const error = errorMessage => ({
  type: SETTING_ERROR,
  error: errorMessage,
});

export const reset = () => ({
  type: SETTING_RESET,
});
