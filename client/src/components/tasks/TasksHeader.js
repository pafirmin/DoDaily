import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  button {
    margin-left: 2rem;
  }
  h2 {
    cursor: pointer;
  }
`;

const TasksNav = styled.nav`
  display: flex;
  align-items: center;
`;

const NavItem = styled.h2`
  border-bottom: ${props =>
    props.currentTab === props.tab
      ? `3px solid ${props.theme.secondaryColour}`
      : '3px solid transparent'};
  color: ${props => (props.currentTab === props.tab ? `inherit` : '#6c6c6c')};
  padding-bottom: '.5rem';

  + * {
    margin-left: 2rem;
  }
`;

const TasksHeader = ({ title, currentTab, switchToTab }) => {
  return (
    <StyledHeader>
      <TasksNav>
        <NavItem tab={1} currentTab={currentTab} onClick={() => switchToTab(1)}>
          {title}
        </NavItem>
        <NavItem tab={2} currentTab={currentTab} onClick={() => switchToTab(2)}>
          Calendar
        </NavItem>
      </TasksNav>
    </StyledHeader>
  );
};

export default TasksHeader;
