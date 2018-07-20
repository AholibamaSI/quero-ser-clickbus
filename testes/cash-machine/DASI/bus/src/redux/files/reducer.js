import { Map } from 'immutable';
// import actions from './actions';

const initState = new Map({});

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}