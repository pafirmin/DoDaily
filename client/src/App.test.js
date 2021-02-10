import React from 'react';
import App from './App';
import { shallow, render, mount } from 'enzyme';
import LoginForm from './components/auth/login-form/LoginForm';
import * as redux from 'react-redux';

describe('App', () => {
  const spy = jest.spyOn(redux, 'useSelector');
  const Form = <LoginForm />;

  beforeEach(() => {
    spy.mockClear();
  });

  it('Hides contentand renders sign-in form when user not authenticated', () => {
    spy.mockReturnValue(false);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
    expect(wrapper.find('.test')).toHaveLength(0);
  });

  it('Hides sign-in form and renders content when user is authenticated', () => {
    spy.mockReturnValue(true);
    const wrapper = shallow(<App />);

    expect(wrapper.find('.test')).toHaveLength(1);
    expect(wrapper.containsMatchingElement(Form)).toEqual(false);
  });
});
