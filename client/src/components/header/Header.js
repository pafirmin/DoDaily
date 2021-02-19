import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../actions/auth';

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${props => props.theme.headerHeight};
  padding: 0 2rem;
  color: #fff;
  background: ${props => props.theme.primaryColour};
  position: sticky;
  top: 0;
  z-index: 1000;
`;
MainHeader.displayName = 'MainHeader';

const MainTitle = styled.h1`
  font-size: 2rem;
`;
MainTitle.displayName = 'MainTitle';

const Header = () => {
  const { isAuthenticated, username } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <MainHeader>
      <MainTitle>Todo list</MainTitle>
      {isAuthenticated && (
        <button onClick={() => dispatch(logout())}>Sign out {username}</button>
      )}
    </MainHeader>
  );
};

export default Header;
