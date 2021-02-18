import React, { Fragment, useEffect } from 'react';
import LoginForm from './components/auth/login-form/LoginForm';
import SignupForm from './components/auth/signup-form/SignupForm';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './actions/auth';
import MainWrapper from './components/main-wrapper/MainWrapper';
import Header from './components/header/Header';
import { ThemeProvider } from 'styled-components';
import GlobalStyle, { MainTheme } from './GlobalStyle';
import Alerts from './components/alerts/Alerts';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Fragment>
      <ThemeProvider theme={MainTheme}>
        <GlobalStyle />
        <Alerts />
        <Header />
        {isAuthenticated ? <MainWrapper /> : <LoginForm />}
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
