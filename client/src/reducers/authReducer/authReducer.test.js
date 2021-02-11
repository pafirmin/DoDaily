import authReducer from './authReducer';

describe('Auth Reducer', () => {
  afterEach(() => {
    localStorage.removeItem('jwt');
  });

  it('Sets token and authenticates user on registration success', () => {
    const action = {
      type: 'REGISTER_SUCCESS',
      data: {
        token: 'test',
      },
    };
    const newState = authReducer(null, action);

    expect(localStorage.getItem('jwt')).toEqual(action.data.token);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('Sets token and authenticates user on login', () => {
    const action = {
      type: 'LOGIN_SUCCESS',
      data: {
        token: 'test',
      },
    };
    const newState = authReducer(null, action);

    expect(localStorage.getItem('jwt')).toEqual(action.data.token);
    expect(newState.isAuthenticated).toBe(true);
  });

  it('Logs user out on LOGOUT action', () => {
    localStorage.setItem('jwt', 'test');
    const state = {
      token: 'test',
      isAuthenticated: true,
    };
    const action = { type: 'LOGOUT' };

    const newState = authReducer(state, action);

    expect(localStorage.getItem('jwt')).toBe(null);
    expect(newState.isAuthenticated).toBe(false);
  });
});
