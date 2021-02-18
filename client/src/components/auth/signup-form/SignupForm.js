import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../shared';
import { register } from '../../../actions/auth';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input required type="text" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="username">
          Username:
          <input
            required
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="What should we call you?"
          />
        </label>
        <label htmlFor="password">
          Choose a secure password:
          <input
            required
            type="password"
            name="password"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="defaultFolderName">
          Choose a name for your default folder:
          <input
            required
            type="text"
            name="defaultFolderName"
            onChange={handleChange}
            placeholder="e.g. 'My day to day', 'Miscellenous'..."
          />
        </label>
        <Button>Create Account</Button>
      </form>
    </div>
  );
};

export default SignupForm;
