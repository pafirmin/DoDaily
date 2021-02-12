import React, { Fragment, useEffect } from 'react';
import LoginForm from './components/auth/login-form/LoginForm';
import { useSelector, useDispatch } from 'react-redux';
import { logout, refreshToken } from './actions/auth';
import MainWrapper from './components/MainWrapper/MainWrapper';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, []);

  return (
    <Fragment>
      <h1>Todo List</h1>
      <button onClick={() => dispatch(logout())}>Logout</button>
      {isAuthenticated ? <MainWrapper /> : <LoginForm />}
    </Fragment>
  );
};

export default App;
