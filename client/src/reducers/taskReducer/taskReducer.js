import {
  GET_TASKS,
  GET_ALL_TASKS,
  NEW_TASK,
  TOGGLE_DONE,
  CHANGE_PRIORITY,
  DELETE_TASK,
  ADD_NOTE,
} from '../../actions/types';

const initialState = [];

const taskReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case GET_TASKS:
      return data;
    case GET_ALL_TASKS:
      return data;
    case NEW_TASK:
      return [data, ...state];
    case TOGGLE_DONE:
      return state.map(task =>
        task._id === data._id ? { ...task, complete: !task.complete } : task
      );
    case CHANGE_PRIORITY:
      return state.map(task =>
        task._id === data._id ? { ...task, priority: data.priority } : task
      );
    case DELETE_TASK:
      return state.filter(task => task._id !== data._id);
    case ADD_NOTE:
      return state.map(task => (task._id === action.data._id ? data : task));
    default:
      return state;
  }
};

export default taskReducer;
