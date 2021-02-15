import axios from '../axios';
import { clearAlerts, createAlert } from './alerts';
import {
  ADD_NOTE,
  GET_TASKS,
  GET_ALL_TASKS,
  NEW_TASK,
  TOGGLE_DONE,
  DELETE_NOTE,
  DELETE_TASK,
  CHANGE_PRIORITY,
} from './types';

export const newTask = (task, folder) => async dispatch => {
  try {
    const body = JSON.stringify(task);
    const res = await axios.post(`/api/tasks/${folder._id}`, body);

    dispatch({
      type: NEW_TASK,
      data: res.data,
    });
    dispatch(createAlert('Task created!', 'SUCCESS'));
  } catch (err) {
    console.error(err);
    err.response.data.map(err => dispatch(createAlert(err.msg, 'DANGER')));
  } finally {
    dispatch(clearAlerts());
  }
};

export const getTasks = folder => async dispatch => {
  try {
    const res = await axios.get(`/api/folders/${folder._id}/tasks`);

    dispatch({
      type: GET_TASKS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllTasks = () => async dispatch => {
  try {
    const res = await axios.get('/api/tasks');

    dispatch({
      type: GET_ALL_TASKS,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTask = task => async dispatch => {
  try {
    await axios.delete(`/api/tasks/${task._id}`);

    dispatch({
      type: DELETE_TASK,
      data: task,
    });
  } catch (err) {
    console.error(err);
  }
};

export const toggleDone = task => async dispatch => {
  try {
    const res = await axios.patch(`/api/tasks/${task._id}/done`);

    dispatch({
      type: TOGGLE_DONE,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const addNote = (task, note) => async dispatch => {
  try {
    const body = JSON.stringify(note);
    const res = await axios.put(`/api/tasks/${task._id}/addnote`, body);

    dispatch({
      type: ADD_NOTE,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteNote = (taskId, noteId) => async dispatch => {
  try {
    const res = await axios.delete(`/api/tasks/${taskId}/notes/${noteId}`);

    dispatch({
      type: DELETE_NOTE,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const changePriority = (task, priority) => async dispatch => {
  try {
    const body = JSON.stringify(priority);
    const res = await axios.patch(`/api/tasks/${task._id}/priority`, body);

    dispatch({
      type: CHANGE_PRIORITY,
      data: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};
