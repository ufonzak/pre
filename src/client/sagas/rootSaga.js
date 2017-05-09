import { call } from 'redux-saga/effects';

import settingsSaga from './settings';
import hdoSaga from './hdo';

export default function* rootSaga() {
  yield [
    call(settingsSaga),
    call(hdoSaga),
  ];
}
