import axios from '../axios';
import * as folders from './folders';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  GET_FOLDERS,
  NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
  SET_FOLDER,
} from '../actions/types';

jest.mock('../axios');
const mockStore = configureMockStore([thunk]);
const store = mockStore({ folders: [] });
const mockReq = { name: 'Some folder', _id: '1' };
const mockRes = { data: { foo: 'bar' } };

describe('New folder action', () => {
  it('Creates a NEW_FOLDER action', async () => {
    axios.post.mockResolvedValue(mockRes);

    const expectedAction = {
      type: NEW_FOLDER,
      data: mockRes.data,
    };

    await store.dispatch(folders.newFolder(mockReq));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Set current folder action', () => {
  it('Creates a SET_FOLDER action', () => {
    const folder = { name: 'Mock folder' };
    const expectedAction = { type: SET_FOLDER, data: folder };

    store.dispatch(folders.setCurrentFolder(folder));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Delete folder action', () => {
  it('Creates a DELETE_FOLDER action', async () => {
    axios.delete.mockResolvedValue('deleted');

    const expectedAction = {
      type: DELETE_FOLDER,
    };

    await store.dispatch(folders.deleteFolder(mockReq));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Get folder action', () => {
  it('Creates a GET_FOLDER action', async () => {
    axios.get.mockResolvedValue(mockRes);

    const expectedAction = {
      type: GET_FOLDERS,
      data: mockRes.data,
    };

    await store.dispatch(folders.getFolders());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Rename folder action', () => {
  it('Creates a RENAME_FOLDER action', async () => {
    axios.patch.mockResolvedValue(mockRes);

    const expectedAction = {
      type: RENAME_FOLDER,
      data: mockRes.data,
    };

    await store.dispatch(folders.renameFolder('baz', mockReq));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
