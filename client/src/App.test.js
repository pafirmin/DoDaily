import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import LoginForm from './components/auth/login-form/LoginForm';
import * as redux from 'react-redux';

describe('App', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const Form = <LoginForm />;

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('Hides content and renders sign-in form when user not authenticated', () => {
    useSelectorMock.mockReturnValue(false);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
    expect(wrapper.find('.test')).toHaveLength(0);
  });

  it('Hides sign-in form and renders content when user is authenticated', () => {
    useSelectorMock.mockReturnValue(true);
    const wrapper = shallow(<App />);

    expect(wrapper.find('.test')).toHaveLength(1);
    expect(wrapper.containsMatchingElement(Form)).toEqual(false);
  });
});
