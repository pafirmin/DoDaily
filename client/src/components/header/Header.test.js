import React from 'react';
import { render, shallow } from 'enzyme';
import Header from './Header';
import * as redux from 'react-redux';

describe('Header', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatch = jest.spyOn(redux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      isAuthenticated: true,
      username: 'test user',
    });
  });

  it('Renders a header element', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('MainHeader')).toHaveLength(1);
  });

  it('Renders a main title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('MainTitle')).toHaveLength(1);
  });

  it("Renders a logout link with user's name when user is logged in", () => {
    const wrapper = render(<Header />);

    expect(wrapper.text().includes('Sign out')).toBe(true);
    expect(wrapper.text().includes('test user')).toBe(true);
  });
});
