import folderReducer from './folderReducer';
import {
  GET_FOLDERS,
  NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
  SET_FOLDER,
} from '../../actions/types';

describe('Folder Reducer', () => {
  const state = {
    currentFolder: null,
    folders: [
      {
        name: 'Test folder 1',
        _id: '1',
      },
      {
        name: 'Test folder 2',
        _id: '2',
      },
    ],
  };

  it('Sets current folder on SET_FOLDER action', () => {
    const action = {
      type: SET_FOLDER,
      data: state.folders[0],
    };

    const newState = folderReducer(state, action);

    expect(newState.currentFolder).toEqual(state.folders[0]);
  });

  it('Initializes state on GET_FOLDERS', () => {
    const action = {
      type: GET_FOLDERS,
      data: state.folders,
    };

    const newState = folderReducer(null, action);

    expect(newState.folders).toHaveLength(2);
    expect(newState.currentFolder).toEqual('SUMMARY');
  });

  it('Returns new state on NEW_FOLDER action', () => {
    const action = {
      type: NEW_FOLDER,
      data: {
        name: 'Test folder 3',
        _id: '3',
      },
    };
    const newState = folderReducer(state, action);

    expect(newState.folders).toHaveLength(3);
    expect(newState.folders).toContainEqual(action.data);
  });

  it('Removes folder from state on DELETE_FOLDER action', () => {
    const action = {
      type: DELETE_FOLDER,
      data: {
        _id: '1',
      },
    };

    const newState = folderReducer(state, action);

    expect(newState.folders).toHaveLength(1);
  });

  it('Renames folder on RENAME_FOLDER action', () => {
    const action = {
      type: RENAME_FOLDER,
      data: {
        _id: '1',
        name: 'Test folder renamed',
      },
    };

    const newState = folderReducer(state, action);

    expect(newState.folders).toContainEqual(action.data);
    expect(newState.folders).toHaveLength(2);
  });
});
