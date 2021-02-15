import React, { useEffect } from 'react';
import FolderList from '../folders/Folders';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../actions/folders';
import TaskList from '../tasks/TaskList';
import Calendar from '../calendar/Calendar';

const MainWrapper = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%' }}>
      {/* <FolderList folders={folders} />
      <TaskList /> */}
      <Calendar />
    </div>
  );
};

export default MainWrapper;
