import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import WelcomeHero from "./WelcomeHero";

const Container = styled.div`
  width: 100%;
  min-height: ${(props) => `calc(100vh - ${props.theme.headerHeight})`};
  background-color: ${(props) => props.theme.primaryColour};
  padding-top: 2rem;
  position: relative;

  @media (min-width: 1300px) {
    padding-top: 6rem;
  }
`;

const AuthPageWrapper = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <WelcomeHero />
      {children}
    </Container>
  );
};

export default AuthPageWrapper;
