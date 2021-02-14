import React, { useState } from 'react';
import styled from 'styled-components';
import FolderListItem from './FolderListItem';
import NewFolder from './NewFolder';
import { Button } from '../shared';

const SideBar = styled.aside`
  background-color: #f3f3f3;
  width: 350px;
  padding: 1.5rem;
  min-height: ${props => `calc(100vh - ${props.theme.headerHeight})`};
  color: #1b1b1b;
  overflow: auto;
  box-shadow: 5px 0px 12px #c3c3c3;

  & ul {
    margin-top: 1rem;
  }
`;
SideBar.displayName = 'SideBar';

const FolderList = ({ folders }) => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  return (
    <SideBar>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>Your Folders</h2>
        <Button onClick={toggleForm}>New</Button>
      </header>
      <div>
        {showForm && <NewFolder />}
        <ul>
          {folders.map(folder => (
            <FolderListItem key={folder._id} folder={folder} />
          ))}
        </ul>
      </div>
    </SideBar>
  );
};

export default FolderList;
