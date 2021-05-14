import {
  GET_FOLDERS,
  NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
  SET_FOLDER,
} from "../../actions/types";

const initialState = {
  currentFolder: "SUMMARY",
  folders: [],
  isLoading: true,
};

const folderReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case SET_FOLDER:
      return {
        ...state,
        currentFolder: data,
      };
    case GET_FOLDERS:
      return {
        currentFolder: data[0],
        folders: data,
        loading: false,
      };
    case NEW_FOLDER:
      return {
        ...state,
        folders: [...state.folders, data],
      };
    case RENAME_FOLDER:
      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder._id === data._id ? { ...folder, name: data.name } : folder
        ),
      };
    case DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder._id !== action.data._id
        ),
      };
    default:
      return state;
  }
};

export default folderReducer;
