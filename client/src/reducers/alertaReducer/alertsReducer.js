import { ALERT, CLEAR_ALERTS } from '../../actions/types';

const initialState = [];

const alertsReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case ALERT:
      return [...state, data];
    case CLEAR_ALERTS:
      return initialState;
    default:
      return state;
  }
};

export default alertsReducer;
