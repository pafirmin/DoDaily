import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { getFolders } from '../../actions/folders';
import FolderList from '../folders/Folders';
import NewTask from '../tasks/NewTask';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TasksWrapper from '../tasks/TasksWrapper';

const MainWrapper = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const dispatch = useDispatch();
  const { folders, currentFolder } = useSelector(state => state.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex', width: '100%', position: 'relative' }}>
        {!isMobile && <FolderList folders={folders} />}
        {currentFolder && <TasksWrapper />}
        <NewTask />
      </div>
    </Router>
  );
};

export default MainWrapper;
