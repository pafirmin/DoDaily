import axios from '../axios';
import {
  SET_FOLDER,
  GET_FOLDERS,
  NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_FOLDER,
} from '../actions/types';

export const setCurrentFolder = folder => {
  return {
    type: SET_FOLDER,
    data: folder,
  };
};

export const newFolder = folderData => async dispatch => {
  try {
    const body = JSON.stringify(folderData);
    const res = await axios.post('/api/folders', body);

    dispatch({
      type: NEW_FOLDER,
      data: res.data,
    });
  } catch (err) {
    const msg = err.data.error.msg;
    dispatch({ type: 'ERROR', data: msg });
  }
};

export const deleteFolder = folder => async dispatch => {
  try {
    await axios.delete(`/api/folders/${folder._id}`);

    dispatch({
      type: DELETE_FOLDER,
    });
  } catch (err) {
    console.error(err);
    const msg = err.data.error.msg;
    dispatch({ type: 'ERROR', data: msg });
  }
};

export const getFolders = () => async dispatch => {
  try {
    const res = await axios.get('/api/folders');

    dispatch({
      type: GET_FOLDERS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    const msg = err.data.error.msg;
    dispatch({ type: 'ERROR', data: msg });
  }
};

export const renameFolder = (newName, folder) => async dispatch => {
  try {
    const body = JSON.stringify({ name: newName });
    const res = await axios.patch(`/api/folders/${folder._id}`, body);

    dispatch({
      type: RENAME_FOLDER,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
    const msg = err.data.error.msg;
    dispatch({ type: 'ERROR', data: msg });
  }
};
