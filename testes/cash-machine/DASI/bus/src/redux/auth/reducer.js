import { Map } from 'immutable';
import { getToken } from '../../helpers/utility';
import actions from './actions';

const initState = new Map({
  idToken: 'secret token',
  username: localStorage.getItem('username'),
  role: localStorage.getItem('role'),
});

export default function authReducer(
  state = initState.merge(getToken()),
  action
) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      return state
        .set('idToken', action.response.token)
        .set('username', action.response.username)
        .set('role', action.response.role)
        .set('regionable', action.response.regionable);
    case actions.LOGOUT:
      return initState;
    default:
      return state;
  }
}
