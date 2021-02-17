import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getFolders } from '../../actions/folders';
import FolderList from '../folders/Folders';
import NewTask from '../tasks/NewTask';
import TasksWrapper from '../tasks/TasksWrapper';

const MainWrapper = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
      {!isMobile && <FolderList folders={folders} />}
      <TasksWrapper />
      <NewTask />
    </div>
  );
};

export default MainWrapper;
