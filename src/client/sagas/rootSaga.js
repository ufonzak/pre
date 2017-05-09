import { call } from 'redux-saga/effects';

import settingsSaga from './settings';
import hdoSaga from './hdo';

export default function* rootSaga() {
  try {
    yield [
      call(settingsSaga),
      call(hdoSaga),
    ];
  } catch (er) {
    console.error('Uncaught error occured', er); // eslint-disable-line no-console
    throw er;
  }
}
