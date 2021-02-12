import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import LoginForm from './components/auth/login-form/LoginForm';
import * as redux from 'react-redux';
import MainWrapper from './components/main-wrapper/MainWrapper';
import Header from './components/header/Header';

describe('App', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const Form = <LoginForm />;
  const Main = <MainWrapper />;

  beforeEach(() => {
    useSelectorMock.mockClear();
  });

  it('Renders a header', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.containsMatchingElement(<Header />)).toEqual(true);
  });

  it('Hides content and renders sign-in form when user not authenticated', () => {
    useSelectorMock.mockReturnValue(false);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Form)).toEqual(true);
    expect(wrapper.containsMatchingElement(Main)).toEqual(false);
  });

  it('Hides sign-in form and renders content when user is authenticated', () => {
    useSelectorMock.mockReturnValue(true);
    const wrapper = shallow(<App />);

    expect(wrapper.containsMatchingElement(Main)).toEqual(true);
    expect(wrapper.containsMatchingElement(Form)).toEqual(false);
  });
});
