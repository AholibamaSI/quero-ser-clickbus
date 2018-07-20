import { all, takeEvery, put, fork, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import actions from './actions';
import config from '../../config';
import { notification } from '../../components';
import { getGenericHeaders, setHeaders, clearToken, clearHeaders, clearStorage } from '../../helpers/utility';

const auth = (username, password) =>
  fetch(`${config.apiUrl}/auth/sign_in`, {
    method: 'POST',
    headers: getGenericHeaders(),
    body: JSON.stringify({
      username,
      password
    })
  });

function* setAuthHeaders (headers) {
  setHeaders(headers);
}

export function* loginRequest() {
  yield takeEvery('LOGIN_REQUEST', function*(action) {
    const { username, password } = action;

    try {
      const rawResponse = yield call(auth, username, password);
      const response = yield rawResponse.json();
      if (rawResponse.status === 201) {
        yield put({ type: actions.LOGIN_SUCCESS, response });
        yield call(setAuthHeaders, rawResponse.headers);
      } else {
        yield put({ type: actions.LOGIN_ERROR, error: response });
      }
    } catch (e) {      
      notification('error', 'Error de conexión. Intente nuevamente o contacte a soporte');
      
    }
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function*(action) {
    yield localStorage.setItem('username', action.response.username);
    yield put(push('/dashboard/atm'));
    notification('success', `Bienvenido ${action.response.username}`)
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function*(action) {    
    try {
      if (Array.isArray(action.error.errors)) {
        action.error.errors.map(error => {
          notification('error', error);
        });
      } else {
        notification('error', action.error);
      }
    } catch (err) {
      if (action.error.status == 500) {        
        console.error('API critical error(500):', action.error.exception);
      } else {
        console.error(err)
      }
    }   
    yield put({ type: actions.LOGOUT });
  });
}

export function* logout() {
  yield takeEvery(actions.LOGOUT, function*() {
    clearToken();
    clearHeaders();
    clearStorage();
    yield put(push('/'));
  });
}
export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout)
  ]);
}
