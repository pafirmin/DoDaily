import axios from '../../axios';

const initialState = {
  token: localStorage.getItem('jwt'),
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'REGISTER_SUCCESS':
      localStorage.setItem('jwt', data.token);
      return {
        token: data,
        isAuthenticated: true,
      };
    case 'REGISTER_FAIL':
      localStorage.removeItem('jwt');
      return {
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const register = userData => async dispatch => {
  try {
    const data = JSON.stringify(userData);

    const res = await axios.post('/api/users', data);

    dispatch({
      type: 'REGISTER_SUCCESS',
      data: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'REGISTER_FAIL',
    });
  }
};

export default authReducer;
