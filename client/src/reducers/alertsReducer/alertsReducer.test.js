import { ALERT, CLEAR_ALERTS } from '../../actions/types';
import alertsReducer from './alertsReducer';

describe('Alerts reducer', () => {
  it('Sets alert on ALERT', () => {
    const action = {
      type: ALERT,
      data: {
        msg: 'Thank you for loggin in',
        type: 'SUCCESS',
      },
    };
    const newState = alertsReducer(undefined, action);

    expect(newState).toContainEqual(action.data);
  });

  it('Clears alerts on CLEAR_ALERTS', () => {
    const state = [{ msg: 'Mock alert' }, { msg: 'Mock alert 2' }];
    const action = { type: CLEAR_ALERTS };

    const newState = alertsReducer(state, action);

    expect(newState).toHaveLength(0);
  });
});
