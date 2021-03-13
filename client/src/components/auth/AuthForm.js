import styled from "styled-components";

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  font-size: 1.3em;

  > * {
    margin-top: 1.5rem;
  }

  input {
    border: 1px solid #c3c3c3;
    width: 100%;
    padding: 0.4rem;
    margin-top: 0.6rem;
    font-size: 1em;

    &::placeholder {
      font-size: 0.8em;
    }
  }
`;

export default AuthForm;
