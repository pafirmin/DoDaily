import React from 'react';
import { shallow, render, mount } from 'enzyme';
import SignupForm from './SignupForm';
import * as redux from 'react-redux';
import AuthForm from '../AuthForm';
import { Button } from '../../shared';

describe('Signup Form', () => {
  const spy = jest.spyOn(redux, 'useDispatch');
  spy.mockReturnValue(null);

  it('Renders a form', () => {
    const wrapper = shallow(<SignupForm />);

    expect(wrapper.find(AuthForm)).toHaveLength(1);
  });

  it('Renders three input fields', () => {
    const wrapper = shallow(<SignupForm />);

    expect(wrapper.find('input')).toHaveLength(4);
  });

  it('Renders a button', () => {
    const wrapper = render(<SignupForm />);

    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
