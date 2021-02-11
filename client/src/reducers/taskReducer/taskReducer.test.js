import taskReducer from './taskReducer';

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
      type: 'GET_TASKS',
      data: state,
    };

    const newState = taskReducer(null, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual(state);
  });

  it('Returns updated state on NEW_TASK action', () => {
    const action = {
      type: 'NEW_TASK',
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
      type: 'TOGGLE_DONE',
      data: {
        _id: '1',
      },
    };
    const newState = taskReducer(state, action);

    expect(newState.find(task => task._id === '1').complete).toBe(true);
  });

  it('Changes priority of a task on CHANGE_PRIORITY', () => {
    const action = {
      type: 'CHANGE_PRIORITY',
      data: {
        _id: '1',
        priority: 'MEDIUM',
      },
    };
    const newState = taskReducer(state, action);

    expect(newState.find(task => task._id === '1').priority).toBe('MEDIUM');
  });

  it('Deletes a task on DELETE_TASK', () => {
    const action = {
      type: 'DELETE_TASK',
      data: {
        _id: '1',
      },
    };

    const newState = taskReducer(state, action);

    expect(newState).toHaveLength(1);
    expect(newState).not.toContainEqual(state[0]);
  });
});
