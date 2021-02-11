import folderReducer from './folderReducer';

describe('Folder Reducer', () => {
  const state = [
    {
      name: 'Test folder 1',
      _id: '1',
    },
    {
      name: 'Test folder 2',
      _id: '2',
    },
  ];

  it('Initializes state on GET_FOLDERS', () => {
    const action = {
      type: 'GET_FOLDERS',
      data: state,
    };

    const newState = folderReducer(null, action);

    expect(newState).toHaveLength(2);
    expect(newState).toEqual(state);
  });

  it('Returns new state on NEW_FOLDER action', () => {
    const action = {
      type: 'NEW_FOLDER',
      data: {
        name: 'Test folder 3',
        _id: '3',
      },
    };
    const newState = folderReducer(state, action);

    expect(newState).toHaveLength(3);
    expect(newState).toContainEqual(action.data);
  });

  it('Removes folder from state on DELETE_FOLDER action', () => {
    const action = {
      type: 'DELETE_FOLDER',
      data: {
        _id: '1',
      },
    };

    const newState = folderReducer(state, action);

    expect(newState).toHaveLength(1);
  });

  it('Renames folder on RENAME_FOLDER action', () => {
    const action = {
      type: 'RENAME_FOLDER',
      data: {
        _id: '1',
        name: 'Test folder renamed',
      },
    };

    const newState = folderReducer(state, action);

    expect(newState).toContainEqual(action.data);
    expect(newState).toHaveLength(2);
  });
});
