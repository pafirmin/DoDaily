import { ALERT, CLEAR_ALERTS } from '../actions/types';

export const createAlert = (msg, type) => {
  return {
    type: ALERT,
    data: {
      msg: msg,
      type: type,
    },
  };
};

export const clearAlerts = () => dispatch => {
  setTimeout(() => dispatch({ type: CLEAR_ALERTS }), 5000);
};
