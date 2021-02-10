import React from 'react';

const FolderList = ({ folders }) => {
  return (
    <div>
      <h2>Your folders</h2>
      <div>
        <ul>
          {folders.map(folder => (
            <li key={folder._id}>{folder.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FolderList;
