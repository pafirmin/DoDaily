import axios from '../axios';
import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_FAIL,
  ALERT,
  CLEAR_ALERTS,
} from '../actions/types';
import { clearAlerts, createAlert } from './alerts';

export const register = userData => async dispatch => {
  try {
    const data = JSON.stringify(userData);
    const res = await axios.post('/api/users', data);

    dispatch({
      type: REGISTER_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

export const login = userCredentials => async dispatch => {
  try {
    const data = JSON.stringify(userCredentials);
    const res = await axios.post('/api/auth', data);

    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data,
    });

    dispatch({
      type: ALERT,
      data: {
        msg: 'Thank you for logging in!',
        type: 'SUCCESS',
      },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_FAIL,
    });
    err.response.data.map(err => dispatch(createAlert(err.msg, 'DANGER')));
  } finally {
    dispatch(clearAlerts());
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/auth/logout');

    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    console.error(err);
  }
};

export const refreshToken = () => async dispatch => {
  try {
    const res = await axios.post('/api/auth/refreshtoken');
    dispatch({
      type: LOGIN_SUCCESS,
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};
