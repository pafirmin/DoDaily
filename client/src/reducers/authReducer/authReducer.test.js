import authReducer from './authReducer';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../../actions/types';

describe('Auth Reducer', () => {
  afterEach(() => {
    localStorage.removeItem('jwt');
  });

  it('Sets token and authenticates user on registration success', () => {
    const action = {
      type: REGISTER_SUCCESS,
      data: {
        username: 'Test user',
        token: 'test',
      },
    };
    const newState = authReducer(null, action);

    expect(localStorage.getItem('jwt')).toEqual(action.data.token);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.username).toEqual(action.data.username);
  });

  it('Sets token and authenticates user on login success', () => {
    const action = {
      type: LOGIN_SUCCESS,
      data: {
        username: 'Test user',
        token: 'test',
      },
    };
    const newState = authReducer(null, action);

    expect(localStorage.getItem('jwt')).toEqual(action.data.token);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.username).toEqual(action.data.username);
  });

  it('Logs user out on LOGOUT action', () => {
    localStorage.setItem('jwt', 'test');
    const state = {
      token: 'test',
      isAuthenticated: true,
    };
    const action = { type: LOGOUT };

    const newState = authReducer(state, action);

    expect(localStorage.getItem('jwt')).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
  });
});
