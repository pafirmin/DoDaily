import styled from 'styled-components';

export const Button = styled.button`
  color: #fff;
  border: none;
  background-color: ${props => props.theme.secondaryColour};
  padding: 0.5em;
  cursor: pointer;
  font: inherit;
`;
