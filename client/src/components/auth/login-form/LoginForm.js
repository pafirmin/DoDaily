import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/auth";
import { Button } from "../../shared";
import { useMediaQuery } from "react-responsive";
import AuthForm from "../AuthForm";
import AuthFormWrapper from "../AuthFormWrapper";
import AuthPageWrapper from "../AuthPageWrapper";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(userData));
  };

  return (
    <AuthPageWrapper>
      <AuthFormWrapper isMobile={isMobile}>
        <div style={{ textAlign: "center", marginTop: ".8rem" }}>
          <p>
            No account? No problem. <br />
            <span style={{ textDecoration: "underline" }}>
              <Link to="/createaccount">Create one here</Link>
            </span>
          </p>
        </div>
        <AuthForm onSubmit={handleSubmit}>
          <label htmlFor="email">
            <p>Email:</p>
            <input type="email" name="email" onChange={handleChange} />
          </label>
          <label htmlFor="password">
            <p> Password:</p>
            <input type="password" name="password" onChange={handleChange} />
          </label>
          <Button>Sign in</Button>
        </AuthForm>
      </AuthFormWrapper>
    </AuthPageWrapper>
  );
};

export default LoginForm;
