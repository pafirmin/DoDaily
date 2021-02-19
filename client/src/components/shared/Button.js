import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1.3em;
  color: #fff;
  border: none;
  background-color: ${props => props.theme.secondaryColour};
  padding: 0.3rem;
  border-radius: 0px;
  cursor: pointer;
`;
