import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../actions/auth';

const MainHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 2rem;
  color: #fff;
  background: #f44343;
`;
MainHeader.displayName = 'MainHeader';

const MainTitle = styled.h1`
  font-size: 2rem;
`;
MainTitle.displayName = 'MainTitle';

const Header = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <MainHeader>
      <MainTitle>Todo list</MainTitle>
      {isAuthenticated && (
        <button onClick={() => dispatch(logout())}>Sign out</button>
      )}{' '}
    </MainHeader>
  );
};

export default Header;
