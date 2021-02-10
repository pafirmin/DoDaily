import instance from '../../axios';
import authReducer from './authReducer';

describe('Auth Reducer', () => {
  afterAll(() => {
    localStorage.removeItem('jwt');
  });

  const action = {
    type: 'REGISTER_SUCCESS',
    data: {
      token: 'test',
    },
  };

  it('Sets token in local storage on registration success', () => {
    authReducer(null, action);
    expect(localStorage.getItem('jwt')).toEqual(action.data.token);
  });

  it('Sets authentication status to true', () => {
    const state = authReducer(null, action);
    expect(state.isAuthenticated).toBe(true);
  });
});
