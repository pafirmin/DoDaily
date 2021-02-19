import {
  TOGGLE_SIDEBAR,
  HIDE_SIDEBAR,
  SET_DATE,
  NEW_TASK_WITH_DATE,
  SHOW_TASKS_ON_DATE,
} from '../../actions/types';

const initialState = { show: false, date: new Date() };

const sidebarReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, show: data };
    case HIDE_SIDEBAR:
      return { ...state, show: false };
    case NEW_TASK_WITH_DATE:
      return { ...state, show: 1, date: data };
    case SHOW_TASKS_ON_DATE:
      return { show: 2, date: data.date };
    case SET_DATE:
      return { ...state, date: data };
    default:
      return state;
  }
};

export default sidebarReducer;
