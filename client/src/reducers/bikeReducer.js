import _ from 'lodash';
import { FETCH_BIKES, ADD_BIKE, DELETE_BIKE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_BIKES:
      return action.payload;
    case ADD_BIKE:
      return [...state, action.payload];
    case DELETE_BIKE:
      return _.filter(state, !_.matches(action.payload));
    default:
      return state;
  }
}
