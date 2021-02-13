import configureMockStore from 'redux-mock-store';
import * as alerts from './alerts';
import { ALERT, CLEAR_ALERTS } from '../actions/types';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({ alerts: [] });

describe('Create alert action', () => {
  it('Creates an ALERT action with correct message and type', () => {
    const alert = { msg: 'An alert', type: 'SUCCESS' };
    const expectedAction = { type: ALERT, data: alert };

    store.dispatch(alerts.createAlert(alert.msg, alert.type));
    expect(store.getActions()).toContainEqual(expectedAction);
  });
});

describe('Clear alerts action', () => {
  it('Creates a CLEAR_ALERT action', () => {
    const expectedAction = { type: CLEAR_ALERTS };

    jest.useFakeTimers();
    store.dispatch(alerts.clearAlerts());
    jest.advanceTimersByTime(5000);

    expect(store.getActions()).toContainEqual(expectedAction);
  });
});
