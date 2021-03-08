import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../../shared";
import { register } from "../../../actions/auth";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm";
import AuthFormWrapper from "../AuthFormWrapper";
import AuthPageWrapper from "../AuthPageWrapper";

const SignupForm = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <AuthPageWrapper>
      <AuthFormWrapper isMobile={isMobile}>
        <h2>Sign up</h2>
        <div style={{ textAlign: "center", marginTop: ".8rem" }}>
          <p>
            Already have an account?
            <p style={{ textDecoration: "underline" }}>
              <Link to="/">Return home to login</Link>
            </p>
          </p>
        </div>
        <AuthForm onSubmit={handleSubmit}>
          <label htmlFor="email">
            Email:
            <input
              required
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="example@example.com"
            />
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
            Name your default folder:
            <input
              required
              type="text"
              name="defaultFolderName"
              onChange={handleChange}
              placeholder="e.g. 'My day to day', 'Miscellenous'..."
            />
          </label>
          <Button>Create Account</Button>
        </AuthForm>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
};

export default SignupForm;
