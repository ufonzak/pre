import {
  LOADING_HDO_DATA,
  LOADING_HDO_DATA_SUCCESS,
  LOADING_HDO_DATA_ERROR,
} from '../reducers/hdo';

export const load = () => ({ type: LOADING_HDO_DATA });
export const loaded = hdoData => ({ type: LOADING_HDO_DATA_SUCCESS, hdoData });
export const error = errorMessage => ({ type: LOADING_HDO_DATA_ERROR, error: errorMessage });
