import React from 'react';
import styled from 'styled-components';
import FolderListItem from './FolderListItem';

const SideBar = styled.aside`
  background-color: #f3f3f3;
  width: 400px;
  padding: 1.5rem;
  min-height: calc(100vh - 150px);
  color: #1b1b1b;
`;

const FolderList = ({ folders }) => {
  return (
    <SideBar>
      <h2>Your Folders</h2>
      <div>
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
