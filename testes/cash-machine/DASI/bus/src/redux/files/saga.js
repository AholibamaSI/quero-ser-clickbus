import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import axios, { post } from 'axios';
import config from '../../config';
import actions from './actions';
import { notification } from '../../components';

const upload = (resource, endpoint, object) => {
  const url = `${config.apiUrl}/${resource}/${object.id}/${endpoint}`;
  const configRequest = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': `${localStorage.getItem('id_token')}`,
      'client': `${localStorage.getItem('client')}`,
      'token-type': `${localStorage.getItem('token-type')}`,
      'uid': `${localStorage.getItem('uid')}`,
      'expiry': `${localStorage.getItem('expiry')}`,
      'regionable': `${localStorage.getItem('regionable')}`,
    }
  };
  let formData = new FormData();

  formData.append('event[file]', object.file);
  return post(url, formData, configRequest);
}

const download = (resource, object, filename) => {
  let url = `${config.apiUrl}/preps/preps_csv?event_uid=`+filename['event_uid'];
  return axios({
    url,
    method: 'GET',
    responseType: 'blob',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token': `${localStorage.getItem('id_token')}`,
      'client': `${localStorage.getItem('client')}`,
      'token-type': `${localStorage.getItem('token-type')}`,
      'uid': `${localStorage.getItem('uid')}`,
      'expiry': `${localStorage.getItem('expiry')}`,
      'regionable': `${localStorage.getItem('regionable')}`,
    }
  });
}


export function* downloadFile() {
  yield takeEvery(actions.FILES_DOWNLOAD, function* (action) {
    console.log(action);
    let { filename, resource, endpoint, object, callback } = action;

    try {
      const response = yield call(download, resource, endpoint, object, callback);

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename+'.csv');
        document.body.appendChild(link);
        link.click();

        callback('success');
      } else {
        yield put({ type: actions.FILES_ERROR, error: response.data });
      }
    } catch (e) {
      yield put({ type: actions.FILES_ERROR, error: e });
    }
  });
}

export function* uploadError () {
  yield takeEvery(actions.FILES_ERROR, function* (action) {
    let { error } = action;
    yield call(notification, 'error', error.message);
  });
}

export function* uploadErrorFile () {
  yield takeEvery(actions.FILES_ERROR_FILE, function* (action) {
    let { error } = action;
    yield call(notification, 'error', error.response.data.message);
  });
}

export default function* rootSaga() {
  yield all([
    //fork(uploadFile),
    fork(uploadError),
    fork(downloadFile),
    fork(uploadErrorFile)
  ]);
}