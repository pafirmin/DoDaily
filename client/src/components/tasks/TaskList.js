import React, { useEffect } from 'react';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../shared';
import NewTask from './NewTask';
import { getTasks } from '../../actions/tasks';

const TasksContainer = styled.div`
  padding: 1.5rem;
`;
TasksContainer.displayName = 'TasksContainer';

const TasksHeader = styled.header`
  display: flex;
  align-items: center;
`;

const TaskList = () => {
  const currentFolder = useSelector(state => state.folders.currentFolder);
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    currentFolder && dispatch(getTasks(currentFolder));
  }, [currentFolder]);

  return (
    <TasksContainer>
      <NewTask />
      <TasksHeader>
        <h2>Tasks</h2>
        <Button>Add</Button>
      </TasksHeader>
      <ul>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </TasksContainer>
  );
};

export default TaskList;
