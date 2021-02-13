import axios from '../axios';
import * as tasks from './tasks';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  GET_TASKS,
  NEW_TASK,
  TOGGLE_DONE,
  CHANGE_PRIORITY,
  DELETE_NOTE,
  DELETE_TASK,
  ADD_NOTE,
} from './types';

jest.mock('../axios');
const mockStore = configureMockStore([thunk]);
const mockTask = { name: 'Some task', _id: '1', priority: 'HIGH', done: false };
const mockFolder = { _id: '1' };
const mockNote = { _id: '1', noteText: 'Test note' };
const mockRes = { data: { foo: 'bar' } };
const store = mockStore({ tasks: [] });

describe('New task action', () => {
  it('Creates NEW_TASK action', async () => {
    axios.post.mockResolvedValue(mockRes);

    const expectedAction = {
      type: NEW_TASK,
      data: mockRes.data,
    };

    await store.dispatch(tasks.newTask(mockTask, mockFolder));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Get tasks action', () => {
  it('Creates a GET_TASKS action', async () => {
    axios.get.mockResolvedValue(mockRes);

    const expectedAction = {
      type: GET_TASKS,
      data: mockRes.data,
    };

    await store.dispatch(tasks.getTasks({ _id: '1' }));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Delete task action', () => {
  it('Creates a DELETE_TASK action', async () => {
    const expectedAction = {
      type: DELETE_TASK,
      data: mockTask,
    };

    await store.dispatch(tasks.deleteTask(mockTask));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Toggle done action', () => {
  it('Creates a TOGGLE_DONE action', async () => {
    axios.patch.mockResolvedValue(mockRes);

    const expectedAction = {
      type: TOGGLE_DONE,
      data: mockRes.data,
    };

    await store.dispatch(tasks.toggleDone(mockTask));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Add note action', () => {
  it('Creates an ADD_NOTE action', async () => {
    axios.put.mockResolvedValue(mockRes);

    const expectedAction = {
      type: ADD_NOTE,
      data: mockRes.data,
    };

    await store.dispatch(tasks.addNote(mockTask, mockNote));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Delete note action', () => {
  it('Creates a DELETE_NOTE action', async () => {
    axios.delete.mockResolvedValue(mockRes);

    const expectedAction = {
      type: DELETE_NOTE,
      data: mockRes.data,
    };

    await store.dispatch(tasks.deleteNote(mockTask._id, mockNote._id));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Change priority action', () => {
  it('Creates a CHANGE_PRIORITY action', async () => {
    axios.patch.mockResolvedValue(mockRes);

    const expectedAction = {
      type: CHANGE_PRIORITY,
      data: mockRes.data,
    };

    await store.dispatch(tasks.changePriority(mockTask, { priority: 'LOW' }));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
