import { SET_FILTER, REMOVE_FILTER } from './types';

export const setFilter = filter => {
  return {
    type: SET_FILTER,
    data: filter,
  };
};

export const removeFilter = filter => {
  return {
    type: REMOVE_FILTER,
    data: filter,
  };
};
