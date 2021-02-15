import { TOGGLE_SIDEBAR, SHOW_SIDEBAR, HIDE_SIDEBAR, SET_DATE } from './types';
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

describe('Show sidebar action', () => {
  it('Creates a toggle sidebar action', () => {
    const expectedAction = {
      type: HIDE_SIDEBAR,
    };

    store.dispatch(sidebar.hideSidebar());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Hide sidebar action', () => {
  it('Creates a toggle sidebar action', () => {
    const expectedAction = {
      type: SHOW_SIDEBAR,
    };

    store.dispatch(sidebar.showSidebar());

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Set date action', () => {
  it('Creates a toggle sidebar action', () => {
    const date = new Date();

    const expectedAction = {
      type: SET_DATE,
      data: date,
    };

    store.dispatch(sidebar.setDate(date));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
