import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import LoginForm from './components/auth/login-form/LoginForm';
import * as redux from 'react-redux';
import MainWrapper from './components/MainWrapper/MainWrapper';

describe('App', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const Form = <LoginForm />;
  const Main = <MainWrapper />;

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('Hides content and renders sign-in form when user not authenticated', () => {
    useSelectorMock.mockReturnValue(false);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
    expect(wrapper.containsMatchingElement(Main)).toEqual(true);
  });

  it('Hides sign-in form and renders content when user is authenticated', () => {
    useSelectorMock.mockReturnValue(true);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
  });
});
