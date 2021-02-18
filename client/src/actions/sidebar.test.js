import {
  TOGGLE_SIDEBAR,
  HIDE_SIDEBAR,
  NEW_TASK_WITH_DATE,
  SHOW_TASKS_ON_DATE,
} from './types';
import configureMockStore from 'redux-mock-store';
import * as sidebar from './sidebar';

const mockStore = configureMockStore();
const store = mockStore({ sidebar: { show: false, date: undefined } });

describe('Toggle sidebar action', () => {
  it('Creates a toggle sidebar action', () => {
    const expectedAction = {
      type: TOGGLE_SIDEBAR,
    };

    store.dispatch(sidebar.toggleSidebar());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('New task with date action', () => {
  it('Creates a new task with date action', () => {
    const date = new Date();

    const expectedAction = {
      type: NEW_TASK_WITH_DATE,
      data: date,
    };

    store.dispatch(sidebar.newTaskWithDate(date));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Hide sidebar action', () => {
  it('Creates a toggle sidebar action', () => {
    const expectedAction = {
      type: HIDE_SIDEBAR,
    };

    store.dispatch(sidebar.hideSidebar());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Show tasks on date', () => {
  it('Creates a show tasks on date action', () => {
    const date = new Date();

    const expectedAction = {
      type: SHOW_TASKS_ON_DATE,
      data: {
        date: date,
        tasks: ['dummy task'],
      },
    };

    store.dispatch(sidebar.showTasksOnDate(['dummy task'], date));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
