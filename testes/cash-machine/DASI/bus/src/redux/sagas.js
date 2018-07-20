import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import crudSagas from './crud/saga';
import filesSagas from './files/saga';
export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    crudSagas(),
    filesSagas()
  ]);
}
