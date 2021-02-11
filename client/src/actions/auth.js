import axios from '../axios';

export const register = userData => async dispatch => {
  try {
    const data = JSON.stringify(userData);
    const res = await axios.post('/api/users', data);

    dispatch({
      type: 'REGISTER_SUCCESS',
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

export const login = userCredentials => async dispatch => {
  try {
    const data = JSON.stringify(userCredentials);
    const res = await axios.post('/api/auth', data);

    dispatch({
      type: 'LOGIN_SUCCESS',
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};
