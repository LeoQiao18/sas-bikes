import axios from 'axios';
import { FETCH_BIKES, ADD_BIKE, DELETE_BIKE } from './types';

export const fetchBikes = callback => async dispatch => {
  const res = await axios.get('/api/bikes');

  dispatch({ type: FETCH_BIKES, payload: res.data });
  if (callback) {
    callback();
  }
};

export const postBike = bike => async dispatch => {
  const res = await axios.post('/api/bikes', bike);

  dispatch({ type: ADD_BIKE, payload: res.data });
};

export const deleteBike = (bikeId, callback) => async dispatch => {
  const res = await axios.delete(`/api/bikes/${bikeId}`);

  dispatch({ type: DELETE_BIKE, payload: res.data });
  if (callback) {
    callback();
  }
};
