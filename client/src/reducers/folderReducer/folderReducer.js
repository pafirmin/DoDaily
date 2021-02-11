import {
  GET_FOLDERS,
  NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
} from '../../actions/types';

const initialState = [];

const folderReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_FOLDERS:
      return data;
    case NEW_FOLDER:
      return [data, ...state];
    case RENAME_FOLDER:
      return state.map(folder =>
        folder._id === data._id ? { ...folder, name: data.name } : folder
      );
    case DELETE_FOLDER:
      return state.filter(folder => folder._id !== action.data._id);
    default:
      return state;
  }
};

export default folderReducer;
