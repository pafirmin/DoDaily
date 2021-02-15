import taskReducer from './taskReducer';
import {
  GET_TASKS,
  GET_ALL_TASKS,
  NEW_TASK,
  TOGGLE_DONE,
  CHANGE_PRIORITY,
  DELETE_TASK,
  ADD_NOTE,
} from '../../actions/types';

describe('Task Reducer', () => {
  const state = [
    {
      _id: '1',
      title: 'Test task 1',
      priority: 'LOW',
      notes: [],
      complete: false,
    },
    {
      _id: '2',
      title: 'Test task 2',
      priority: 'HIGH',
      notes: [],
      complete: false,
    },
  ];

  it('Initializes state on GET_TASKS', () => {
    const action = {
      type: GET_TASKS,
      data: state,
    };

    const newState = taskReducer(undefined, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual(state);
  });

  it('Returns tasks on GET_ALL_TASKS', () => {
    const action = {
      type: GET_ALL_TASKS,
      data: state,
    };

    const newState = taskReducer(undefined, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual(state);
  });

  it('Returns updated state on NEW_TASK action', () => {
    const action = {
      type: NEW_TASK,
      data: {
        title: 'test',
      },
    };
    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(3);
    expect(newState).toContainEqual(action.data);
  });

  it('Toggles done status of a task on TOGGLE_DONE', () => {
    const action = {
      type: TOGGLE_DONE,
      data: {
        _id: '1',
      },
    };
    const newState = taskReducer(state, action);

    expect(newState.find(task => task._id === action.data._id).complete).toBe(
      true
    );
  });

  it('Changes priority of a task on CHANGE_PRIORITY', () => {
    const action = {
      type: CHANGE_PRIORITY,
      data: {
        _id: '1',
        priority: 'MEDIUM',
      },
    };
    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(state.length);
    expect(newState.find(task => task._id === action.data._id).priority).toBe(
      'MEDIUM'
    );
  });

  it('Deletes a task on DELETE_TASK', () => {
    const action = {
      type: DELETE_TASK,
      data: {
        _id: '1',
      },
    };

    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(state.length - 1);
    expect(newState).not.toContainEqual(state[0]);
  });

  it('Adds a note to a task on ADD_NOTE', () => {
    const action = {
      type: ADD_NOTE,
      data: {
        _id: '1',
        notes: ['test'],
      },
    };
    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(state.length);
    expect(newState).toContainEqual(action.data);
  });
});
