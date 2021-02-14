import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_FAIL,
} from '../../actions/types';

const initialState = {
  username: null,
  token: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('jwt', data.token);
      return {
        username: data.username,
        token: data.token,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('jwt', data.token);
      return {
        username: data.username,
        token: data.token,
        isAuthenticated: true,
      };
    case LOGOUT:
      localStorage.removeItem('jwt');
      return {
        username: null,
        token: null,
        isAuthenticated: false,
      };
    case AUTH_FAIL:
      localStorage.removeItem('jwt');
      return {
        username: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
