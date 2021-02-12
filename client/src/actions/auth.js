import axios from '../axios';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_FAIL,
} from '../actions/types';

export const register = userData => async dispatch => {
  try {
    const data = JSON.stringify(userData);
    const res = await axios.post('/api/users', data);

    dispatch({
      type: REGISTER_SUCCESS,
      data: { token: res.data },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = userCredentials => async dispatch => {
  try {
    const data = JSON.stringify(userCredentials);
    const res = await axios.post('/api/auth', data);

    dispatch({
      type: LOGIN_SUCCESS,
      data: { token: res.data },
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: AUTH_FAIL,
    });
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
      data: { token: res.data },
    });
  } catch (err) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};
