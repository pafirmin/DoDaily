import Alerts from './Alerts';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';

const alerts = [
  {
    msg: 'Success alert',
    type: 'SUCCESS',
  },
  {
    msg: 'Fail alert',
    type: 'DANGER',
  },
];

const useSelectorMock = jest.spyOn(redux, 'useSelector');
describe('Alerts container', () => {
  it('Renders', () => {
    useSelectorMock.mockReturnValue(alerts);
    const wrapper = shallow(<Alerts />);
    expect(wrapper.find('alerts-container')).toHaveLength(1);
  });

  it('Renders a list of alerts', () => {
    useSelectorMock.mockReturnValue(alerts);
    const wrapper = shallow(<Alerts />);

    expect(wrapper.find('alert')).toHaveLength(alerts.length);
  });
});
