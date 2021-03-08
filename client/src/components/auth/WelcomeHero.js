import React from "react";
import styled from "styled-components";

const HeroWrapper = styled.div`
  font-family: "Montserrat Alternates", sans-serif;
  position: absolute;
  max-width: 500px;
  left: 5rem;
  top: 5rem;
  color: #fff;
  font-size: 3rem;

  h2 {
    margin-bottom: 3rem;
  }

  @media (max-width: 1600px) {
    font-size: 2rem;
    top: 3rem;
  }
  @media (max-width: 1300px) {
    position: static;
    margin: 0 auto;
    text-align: center;

    h2 {
      margin-bottom: 1rem;
    }
  }
`;

const WelcomeHero = () => {
  return (
    <HeroWrapper>
      <h2>Welcome to DoDaily</h2>
      <p>First on your agenda...</p>
      <p>Get signed in!</p>
    </HeroWrapper>
  );
};

export default WelcomeHero;
