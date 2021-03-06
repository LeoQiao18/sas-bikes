import _ from 'lodash';
import { FETCH_BIKES, ADD_BIKE, DELETE_BIKE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_BIKES:
      return action.payload;
    case ADD_BIKE:
      return [action.payload, ...state];
    case DELETE_BIKE:
      return _.filter(state, ({ _id }) => !(_id === action.payload));
    default:
      return state;
  }
}
