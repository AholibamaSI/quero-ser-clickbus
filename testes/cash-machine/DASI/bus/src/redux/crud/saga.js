import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import actions from './actions';
import authActions from '../auth/actions';
import { notification } from '../../components/index';

import { index, show, create, update, destroy, generic, custom } from './helpers';

export function* crudIndex() {
  yield takeEvery(actions.CRUD_INDEX, function* (action) {
    const { callback } = action;
    try {
      const rawResponse = yield call(index, action.resource,
        action.page, action.optionalParams);
      const page = Number(rawResponse.headers.get('X-Page'));
      const perPage = Number(rawResponse.headers.get('X-Per-Page'));
      const totalPages = Number(rawResponse.headers.get('X-Total'));
      const response = yield rawResponse.json();

      if (rawResponse.status === 200 || rawResponse.status === 304) {
        const pagination = {
          current: page,
          pageSize: perPage,
          total: totalPages,
        };
        yield put({
          type: actions.CRUD_INDEX_SUCCESS,
          resource: action.resource,
          // This are the names used by ant tables
          pagination,
          response
        });

        if (callback) callback('success', response, pagination);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}

export function* crudIndexError() {
  // TODO: check if we can send all errors here instead of having one
  // corresponding error actions
  yield takeEvery(actions.CRUD_INDEX_ERROR, function* (action) {
    yield notification('error', action.error.message);
  })
}

export function* crudDestroy() {
  yield takeEvery(actions.CRUD_DESTROY, function* (action) {
    let { callback } = action;

    try {
      const rawResponse = yield call(destroy, action.resource, action.object);
      const response = yield rawResponse.json();

      if (rawResponse.status === 200) {
        notification('success', response.message);

        if (callback) callback('success', response);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}

export function* crudUpdate() {
  yield takeEvery(actions.CRUD_UPDATE, function* (action) {
    let { callback, endpoint } = action;

    try {
      const rawResponse = yield call(update, action.resource, action.paramsName, action.object, endpoint);
      const response = yield rawResponse.json();

      if (rawResponse.status === 200) {
        notification('success', 'Actualizado correctamente');
        if (callback) callback('success', response);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      if (callback) callback('error', null);
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}

export function* crudCreate() {
  yield takeEvery(actions.CRUD_CREATE, function* (action) {
    let { resource, paramsName, object, callback } = action;

    try {
      const rawResponse = yield call(create, resource, paramsName, object);
      const response = yield rawResponse.json();

      if (rawResponse.status === 201 || rawResponse.status === 200) {
        notification('success', 'Creado correctamente');
        if (callback) callback('success', response);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      if (callback) callback('error', null);
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}

export function* crudShow() {
  yield takeEvery(actions.CRUD_SHOW, function* (action) {
    let { resource, object, optionalParams, callback } = action;

    try {
      const rawResponse = yield call(show, resource, object, optionalParams);
      const response = yield rawResponse.json();

      if (rawResponse.status === 200) {
        if (callback) callback('success', response);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      if (callback) callback('error', null);
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}



export function* crudGeneric() {
  yield takeEvery(actions.CRUD_GENERIC, function* (action) {
    let { endpoint, method, optionalParams, page, callback } = action;

    if (method) { } else { method = 'GET' }

    try {
      const rawResponse = yield call(generic, { endpoint, method, optionalParams, page });
      const page = Number(rawResponse.headers.get('X-Page'));
      const perPage = Number(rawResponse.headers.get('X-Per-Page'));
      const totalPages = Number(rawResponse.headers.get('X-Total'));
      const pagination = {
        current: page,
        pageSize: perPage,
        total: totalPages,
      };
      const response = yield rawResponse.json();

      if (rawResponse.status === 200) {
       
        if (callback) callback('success', response, pagination);
      } else {
        if (callback) callback('error', null);
        response.status = rawResponse.status;
        yield put({ type: actions.CRUD_ERROR, error: response });
      }
    } catch (e) {
      if (callback) callback('error', null);
      yield put({ type: actions.CRUD_ERROR, error: e });
    }
  });
}

export function* crudCustom() {
  yield takeEvery(actions.CRUD_CUSTOM, function* (action) {
    let { endpoint, method, paramsName, object, callback } = action;
      try {
      const rawResponse = yield call(custom, { endpoint, method, paramsName, object });
      const page = Number(rawResponse.headers.get('X-Page'));
      const perPage = Number(rawResponse.headers.get('X-Per-Page'));
      const totalPages = Number(rawResponse.headers.get('X-Total'));
      const pagination = {
        current: page,
        pageSize: perPage,
        total: totalPages,
      };

      let response = null
        try {
          response = yield rawResponse.json();
        } catch (e) {
          response = yield rawResponse;
        }
        if (rawResponse.status === 200) {
          if (response.message) {
            yield call(notification, 'success', response.message)
          }
          if (callback) callback('success', response, pagination);
        }else if(rawResponse.status === 400){
          yield call(notification, 'error', response.message)
        } else {
          if (callback) callback('error', null);
          response.status = rawResponse.status;
          yield put({ type: actions.CRUD_ERROR, error: response });
        }
      } catch (e) {

        if (callback) callback('error', null);
        yield put({ type: actions.CRUD_ERROR, error: e });
      }
    });
  }


export function* crudError() {
  yield takeEvery(actions.CRUD_ERROR, function* (action) {
    if (action.error.message) {
      if (typeof (action.error.message) === 'object') {
        for (let key in action.error.message) {
          if (key !== 'status') {
            yield call(notification, 'error', action.error.message[key][0]);
          }
        }
      } else {
        switch (action.error.message) {
          case "Unauthorized":
            yield call(notification, 'error', action.error.message);
            yield put({ type: authActions.LOGOUT });
            break;
          case "Failed to fetch":
            yield call(notification, 'error', "Network error");
            break;
          default:
            yield call(notification, 'error', action.error.message);
            break;
        }
      }
    } else {
      if (action.error.status === 401) {
        yield put({ type: authActions.LOGOUT });
      } else {
       
        // for (let key in action.error) {
        //   if (key !== 'status') {
        //     let errorMessage = `${key}: ${action.error[key].join(', ')}`;
        //     yield call(notification, 'error', errorMessage);
        //   }
        // }
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(crudIndex),
    fork(crudDestroy),
    fork(crudError),
    fork(crudUpdate),
    fork(crudCreate),
    fork(crudShow),
    fork(crudGeneric),
    fork(crudCustom),
  ]);
}