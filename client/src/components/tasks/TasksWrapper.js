import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../actions/tasks';
import TaskList from './TaskList';
import Calendar from '../calendar/Calendar';
import TasksHeader from './TasksHeader';

const TasksContainer = styled.div`
  padding: 1.5rem;
  position: relative;
  width: 1200px;
  overflow-x: hidden;
`;
TasksContainer.displayName = 'TasksContainer';

const TasksWrapper = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const dispatch = useDispatch();
  const currentFolder = useSelector(state => state.folders.currentFolder);

  useEffect(() => {
    dispatch(getTasks(currentFolder));
  }, [currentFolder]);

  return (
    <TasksContainer>
      <TasksHeader
        title={currentFolder?.name || 'Summary'}
        currentTab={currentTab}
        switchToTab={tab => setCurrentTab(tab)}
      />
      {currentTab === 1 && <TaskList />}
      {currentTab === 2 && <Calendar />}
    </TasksContainer>
  );
};

export default TasksWrapper;
