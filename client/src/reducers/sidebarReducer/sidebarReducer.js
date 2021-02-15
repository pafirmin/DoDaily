import {
  TOGGLE_SIDEBAR,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_DATE,
} from '../../actions/types';

const initialState = { show: false, date: undefined };

const sidebarReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, show: !state.show };
    case SHOW_SIDEBAR:
      return { ...state, show: true };
    case HIDE_SIDEBAR:
      return { ...state, show: false };
    case SET_DATE:
      return { show: true, date: data };
    default:
      return state;
  }
};

export default sidebarReducer;
