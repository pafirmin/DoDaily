import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../actions/auth';
import { Button } from '../../shared';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(userData);

    dispatch(login(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input type="text" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="password">
          Password:
          <input type="password" name="password" onChange={handleChange} />
        </label>
        <Button>Sign in</Button>
      </form>
    </div>
  );
};

export default LoginForm;
