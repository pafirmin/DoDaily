import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import FolderListItem from './FolderListItem';
import { StyledLi } from '../shared';
import NewFolder from './NewFolder';
import { Button } from '../shared';
import { setCurrentFolder } from '../../actions/folders';
import { hideSidebar } from '../../actions/sidebar';

const SideBar = styled.aside`
  background-color: #f3f3f3;
  width: 350px;
  padding: 1.5rem;
  position: fixed;
  left: ${props => (props.breakpoint ? (props.show ? '0' : '-400px') : '0')};
  top: ${props => props.theme.headerHeight};
  min-height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  color: #1b1b1b;
  overflow: auto;
  box-shadow: 5px 0px 12px #c3c3c3;
  transition: 0.3s;
  z-index: 500;

  & ul {
    margin-top: 1rem;
  }
`;
SideBar.displayName = 'SideBar';

const FolderList = ({ folders }) => {
  const SIDEBAR_ID = 3;
  const breakpoint = useMediaQuery({ maxWidth: 1450 });
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const show = useSelector(state => state.sidebar.show);

  return (
    <SideBar show={show === SIDEBAR_ID} breakpoint={breakpoint}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Your Folders</h2>
        <Button onClick={() => setShowForm(!showForm)}>New</Button>
        {breakpoint && (
          <i
            style={{ fontSize: '2em', cursor: 'pointer', color: '#a7a7a7' }}
            aria-label="Close menu"
            className="fas fa-times"
            onClick={() => dispatch(hideSidebar(SIDEBAR_ID))}
          ></i>
        )}
      </header>
      <div>
        {showForm && <NewFolder />}
        <ul>
          <StyledLi
            key="SUMMARY"
            onClick={() => dispatch(setCurrentFolder('SUMMARY'))}
          >
            Summary
          </StyledLi>
          {folders.map(folder => (
            <FolderListItem key={folder._id} folder={folder} />
          ))}
        </ul>
      </div>
    </SideBar>
  );
};

export default FolderList;
