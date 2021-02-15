import {
  TOGGLE_SIDEBAR,
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SET_DATE,
} from '../../actions/types';
import sidebarReducer from './sidebarReducer';

describe('Sidebar reducer', () => {
  it('Sets show sidebar to true on SHOW_SIDEBAR', () => {
    const initialState = { show: false, date: undefined };
    const action = {
      type: SHOW_SIDEBAR,
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.show).toBe(true);
  });

  it('Sets show sidebar to false on HIDE_SIDEBAR', () => {
    const initialState = { show: true, date: undefined };
    const action = {
      type: HIDE_SIDEBAR,
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.show).toBe(false);
  });

  it('Sets date state on SET_DATE', () => {
    const initialState = { show: true, date: undefined };
    const date = new Date();
    const action = {
      type: SET_DATE,
      data: date,
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.date).toEqual(date);
  });
});
