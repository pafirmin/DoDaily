import { TOGGLE_SIDEBAR, SHOW_SIDEBAR, HIDE_SIDEBAR, SET_DATE } from './types';

export const toggleSidebar = () => {
  return { type: TOGGLE_SIDEBAR };
};

export const showSidebar = () => {
  return { type: SHOW_SIDEBAR };
};

export const hideSidebar = () => {
  return { type: HIDE_SIDEBAR };
};

export const setDate = date => {
  return { type: SET_DATE, data: date };
};
