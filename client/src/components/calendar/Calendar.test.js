import React from 'react';
import { shallow } from 'enzyme';
import { getDaysInMonth } from 'date-fns';
import Calendar from './Calendar';
import CalendarDay from './CalendarDay';
import * as redux from 'react-redux';

describe('Calendar', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const mockResponse = [
    {
      _id: '1',
      dueDate: new Date().toString(),
    },
    {
      _id: '2',
      dueDate: new Date().toString(),
    },
    {
      _id: '3',
      dueDate: new Date().toString(),
    },
  ];
  it('Creates number of days equal to days in month', () => {
    useSelectorMock.mockReturnValue(mockResponse);

    const numberOfDays = getDaysInMonth(new Date());
    const wrapper = shallow(<Calendar />);

    expect(wrapper.find(CalendarDay)).toHaveLength(numberOfDays);
  });
});
