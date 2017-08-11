import axios from 'axios';
import { FETCH_BIKES, ADD_BIKE } from './types';

export const fetchBikes = () => async dispatch => {
  const res = await axios.get('/api/bikes');

  dispatch({ type: FETCH_BIKES, payload: res.data });
};

export const postBike = bike => async dispatch => {
  const res = await axios.post('/api/bikes', bike);

  dispatch({ type: ADD_BIKE, payload: res.data });
};
