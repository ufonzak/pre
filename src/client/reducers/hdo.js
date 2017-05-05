export const LOADING_HDO_DATA = 'LOADING_HDO_DATA';
export const LOADING_HDO_DATA_SUCCESS = 'LOADING_HDO_DATA_SUCCESS';
export const LOADING_HDO_DATA_ERROR = 'LOADING_HDO_DATA_ERROR';

const initialState = {
  loading: false,
  hdoData: null,
};

export default (state = initialState, { type, hdoData, error }) => {
  switch (type) {
    case LOADING_HDO_DATA:
      return { ...state, loading: true, hdoData: null, error: null };
    case LOADING_HDO_DATA_SUCCESS:
      return { ...state, loading: false, hdoData };
    case LOADING_HDO_DATA_ERROR:
      return { ...state, loading: false, error };
    default:
      return state;
  }
};
