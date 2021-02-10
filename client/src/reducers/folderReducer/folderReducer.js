const initialState = [];

const folderReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'GET_FOLDERS':
      return data;
    case 'NEW_FOLDER':
      return [data, ...state];
    case 'DELETE_FOLDER':
      return state.filter(folder => folder._id !== action.data._id);
    default:
      return state;
  }
};

export const fetchNotes = () => {
  return {
    action: 'GET_FOLDERS',
  };
};

export const createFolder = name => {
  return {
    type: 'NEW_FOLDER',
    data: {
      name,
    },
  };
};

export default folderReducer;
