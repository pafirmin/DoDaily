import React, { useEffect } from 'react';
import FolderList from '../folders/Folders';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../actions/folders';
import TaskList from '../tasks/TaskList';

const MainWrapper = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <FolderList folders={folders} />
      <TaskList />
    </div>
  );
};

export default MainWrapper;
