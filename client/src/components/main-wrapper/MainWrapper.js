import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../actions/folders';
import FolderList from '../folders/Folders';
import TaskList from '../tasks/TaskList';
import Calendar from '../calendar/Calendar';
import NewTask from '../tasks/NewTask';

const MainWrapper = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
      {/* <FolderList folders={folders} />
      <TaskList /> */}
      <Calendar />
      <NewTask />
    </div>
  );
};

export default MainWrapper;
