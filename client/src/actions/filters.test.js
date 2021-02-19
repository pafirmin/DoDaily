import configureMockStore from 'redux-mock-store';
import { REMOVE_FILTER, SET_FILTER } from './types';
import * as filters from './filters';

const mockStore = configureMockStore();
const store = mockStore();

describe('Set filter action', () => {
  it('Creates a SET_FILTER action', () => {
    const expectedAction = { type: SET_FILTER, data: 'URGENT_ONLY' };
    store.dispatch(filters.setFilter('URGENT_ONLY'));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Remove filter action', () => {
  it('Creates a REMOVE_FILTER action', () => {
    const expectedAction = { type: REMOVE_FILTER, data: 'URGENT_ONLY' };
    store.dispatch(filters.removeFilter('URGENT_ONLY'));

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
