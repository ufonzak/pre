import settingsSaga from './settings';
import hdoSaga from './hdo';

export default function* rootSaga() {
  yield [
    settingsSaga(),
    hdoSaga(),
  ];
}
