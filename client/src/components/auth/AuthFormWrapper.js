import styled from 'styled-components';

const AuthFormWrapper = styled.div`
  margin: ${props => (props.isMobile ? '2rem auto' : '5rem auto')};
  padding: 0 2rem;
  width: ${props => (props.isMobile ? '100%' : '400px')};

  h2 {
    font-size: 1.4em;
    text-align: center;
  }
`;

export default AuthFormWrapper;
