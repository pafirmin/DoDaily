import {
  TOGGLE_SIDEBAR,
  HIDE_SIDEBAR,
  NEW_TASK_WITH_DATE,
  SHOW_TASKS_ON_DATE,
} from '../../actions/types';
import sidebarReducer from './sidebarReducer';

describe('Sidebar reducer', () => {
  it('Sets date and correct sidebar on NEW_TASK_WITH_DATE', () => {
    const date = new Date();
    const initialState = { show: false, date: undefined, tasks: [] };
    const action = {
      type: NEW_TASK_WITH_DATE,
      data: {
        show: 1,
        date: date,
      },
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.show).toBe(1);
    expect(newState.date).toEqual(date);
  });

  it('Sets show sidebar to false on HIDE_SIDEBAR', () => {
    const initialState = { show: true, date: undefined };
    const action = {
      type: HIDE_SIDEBAR,
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.show).toBe(false);
  });

  it('Sets task and sidebar 2 on SHOW_TASKS_ON_DATE', () => {
    const initialState = { show: true, date: undefined, tasks: [] };
    const date = new Date();
    const action = {
      type: SHOW_TASKS_ON_DATE,
      data: {
        tasks: ['dummy task'],
        show: 2,
        date: date,
      },
    };
    const newState = sidebarReducer(initialState, action);

    expect(newState.date).toEqual(date);
    expect(newState.tasks).toEqual(action.data.tasks);
    expect(newState.show).toEqual(2);
  });
});
