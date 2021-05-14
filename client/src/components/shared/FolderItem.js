import styled from "styled-components";

export const StyledLi = styled.li`
  font-size: 1.4em;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#e3e3e3" : "none")};
  padding: 0.5rem;
`;
