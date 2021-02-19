import {
  TOGGLE_SIDEBAR,
  HIDE_SIDEBAR,
  NEW_TASK_WITH_DATE,
  SHOW_TASKS_ON_DATE,
  SET_DATE,
} from './types';

export const toggleSidebar = id => {
  return { type: TOGGLE_SIDEBAR, data: id };
};

export const showTasksOnDate = date => {
  return {
    type: SHOW_TASKS_ON_DATE,
    data: {
      date: date,
    },
  };
};

export const hideSidebar = () => {
  return { type: HIDE_SIDEBAR };
};

export const newTaskWithDate = date => {
  return { type: NEW_TASK_WITH_DATE, data: date };
};

export const setDate = date => {
  return { type: SET_DATE, data: date };
};
