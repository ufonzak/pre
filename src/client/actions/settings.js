import { SETTING_LOADING, SETTING_LOADING_SUCESS, SETTING_LOADING_ERROR } from '../reducers/constants';

const load = () => ({
  type: SETTING_LOADING,
});

const loaded = data => ({
  type: SETTING_LOADING_SUCESS,
  data,
});

const error = errorData => ({
  type: SETTING_LOADING_ERROR,
  error: errorData,
});

export default { load, loaded, error };
