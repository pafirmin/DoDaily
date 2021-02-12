import axios from '../axios';
import * as auth from './auth';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

jest.mock('../axios');
const mockStore = configureMockStore([thunk]);
const mockRes = { data: 'dummyToken' };
const mockReq = { email: 'test@test.com', password: 'test' };
const store = mockStore({ auth: { token: null, isAuthenticated: false } });

describe('Register action', () => {
  it('creates REGISTER_SUCCESS when registration succedes', async () => {
    axios.post.mockResolvedValue(mockRes);

    const expectedAction = {
      type: REGISTER_SUCCESS,
      data: { token: mockRes.data },
    };

    await store.dispatch(auth.register(mockReq));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Login action', () => {
  it('Sends LOGIN_SUCCESS on successful login', async () => {
    axios.post.mockResolvedValue(mockRes);

    const expectedAction = {
      type: LOGIN_SUCCESS,
      data: { token: mockRes.data },
    };

    await store.dispatch(auth.login(mockReq));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Logout action', () => {
  it('Returns a LOGOUT action', async () => {
    const expectedAction = { type: LOGOUT };

    await store.dispatch(auth.logout());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
