import React from 'react';
import { shallow, render } from 'enzyme';
import LoginForm from './LoginForm';
import * as redux from 'react-redux';
import AuthForm from '../AuthForm';
import { Button } from '../../shared';

describe('Login Form', () => {
  const spy = jest.spyOn(redux, 'useDispatch');
  spy.mockReturnValue(null);

  it('Renders a form', () => {
    const wrapper = shallow(<LoginForm />);

    expect(wrapper.find(AuthForm)).toHaveLength(1);
  });

  it('Renders two input fields', () => {
    const wrapper = shallow(<LoginForm />);

    expect(wrapper.find('input')).toHaveLength(2);
  });

  it('Renders a button', () => {
    const wrapper = render(<LoginForm />);

    expect(wrapper.find(Button)).toHaveLength(1);
  });
});
