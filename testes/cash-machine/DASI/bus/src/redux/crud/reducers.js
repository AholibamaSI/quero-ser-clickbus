import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({});

export default (state = initState, action) => {  
  switch (action.type) {
    case actions.CRUD_INDEX_SUCCESS:
      let newState = {...state};      
      newState[`${action.resource}_index`] = action.response;
      newState[`${action.resource}_index_pagination`] = action.pagination;
      return newState;
    default:
      return state;
  }
}