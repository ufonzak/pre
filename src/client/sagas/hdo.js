import { takeLatest, put, call } from 'redux-saga/effects';

import { fetch } from '../tools/fetch';
import * as actions from '../actions/hdo';

function* load() {
  try {
    const hdoData = yield call(fetch, '/api/hdo/today');
    yield put(actions.loaded(hdoData));
  } catch (er) {
    switch (er.meta.code) {
      case 403:
        yield put(actions.error('Failed to login to pre.cz'));
        break;
      default:
        yield put(actions.error(er.message));
    }
  }
}


export default function* () {
  yield takeLatest(actions.load().type, load);
}
