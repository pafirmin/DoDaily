import React, { Fragment } from 'react';
import SignupForm from './components/auth/signup-form/SignupForm';
import LoginForm from './components/auth/login-form/LoginForm';
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <h1>Todo List</h1>
      {isAuthenticated ? <div className="test" /> : <LoginForm />}
    </Fragment>
  );
};

export default App;
