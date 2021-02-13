import React, { Fragment, useEffect } from 'react';
import LoginForm from './components/auth/login-form/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from './actions/auth';
import MainWrapper from './components/main-wrapper/MainWrapper';
import Header from './components/header/Header';
import GlobalStyle from './GlobalStyle';
import Alerts from './components/alerts/Alerts';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Fragment>
      <GlobalStyle />
      <Alerts />
      <Header />
      {isAuthenticated ? <MainWrapper /> : <LoginForm />}
    </Fragment>
  );
};

export default App;
