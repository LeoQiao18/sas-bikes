import { FETCH_BIKES, ADD_BIKE } from '../actions/types';

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_BIKES:
      return action.payload;
    case ADD_BIKE:
      return [...state, action.payload];
    default:
      return state;
  }
}
