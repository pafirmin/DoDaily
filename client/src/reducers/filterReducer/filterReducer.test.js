import { REMOVE_FILTER, SET_FILTER } from '../../actions/types';
import filterReducer from './filterReducer';

describe('Filter reducer', () => {
  it('Adds a filter on SET_FILTER', () => {
    const action = { type: SET_FILTER, data: 'URGENT_ONLY' };
    const newState = filterReducer([], action);

    expect(newState).toContainEqual(action.data);
  });

  it('Removes a filter on REMOVE_FILTER', () => {
    const action = { type: REMOVE_FILTER, data: 'URGENT_ONLY' };
    const newState = filterReducer(['URGENT_ONLY'], action);

    expect(newState).toHaveLength(0);
  });
});
