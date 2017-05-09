import { takeLatest, put, call } from 'redux-saga/effects';


import { fetch, post } from '../tools/fetch';
import * as actions from '../actions/settings';

function* load() {
  try {
    const settingsData = yield call(fetch, '/api/settings/pre');
    yield put(actions.loaded(settingsData));
  } catch (er) {
    yield put(actions.error(er.message));
  }
}

function* save({ data }) {
  try {
    yield call(post, '/api/settings/pre', data);
    yield put(actions.saved(data));
  } catch (er) {
    yield put(actions.error(er.message));
  }
}

export default function* () {
  yield takeLatest(actions.load().type, load);
  yield takeLatest(actions.save().type, save);
}
