import React from 'react';
import { useMediaQuery } from 'react-responsive';
import styled, { css, keyframes } from 'styled-components';

const TasksNav = styled.nav`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  justify-content: center;

  h3 {
    cursor: pointer;
  }
`;

const SlideIn = keyframes`
  from {width: 0};
  to {width: 100%}
`;

const UnderLine = css`
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
  width: 100%;
  height: 3px;
  border-radius: 3px;
`;

const NavItem = styled.h3`
  font-size: 1.2em;
  position: relative;
  width: 8rem;
  text-align: center;
  padding-bottom: 0.4rem;
  color: ${props => (props.isActive ? `inherit` : '#6c6c6c')};
  overflow-x: hidden;
  transition: color 0.2s;

  + * {
    margin-left: 2rem;
  }
  &:before {
    ${UnderLine}
    z-index: 1;
    background: #c3c3c3;
  }
  ${props =>
    props.isActive &&
    css`
      &:after {
        ${UnderLine}
        z-index: 5;
        animation: ${SlideIn} 0.2s ease;
        background: ${props => props.theme.secondaryColour};
      }
    `}
`;

const TasksHeader = ({ title, currentTab, switchToTab }) => {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  return (
    <header>
      <h2
        style={{
          paddingBottom: '.4rem',
          textAlign: isMobile ? 'center' : 'left',
        }}
      >
        {title}
      </h2>
      <TasksNav>
        <NavItem isActive={currentTab === 1} onClick={() => switchToTab(1)}>
          Tasks
        </NavItem>
        <NavItem isActive={currentTab === 2} onClick={() => switchToTab(2)}>
          Calendar
        </NavItem>
      </TasksNav>
    </header>
  );
};

export default TasksHeader;
