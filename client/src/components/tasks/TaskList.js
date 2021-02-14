import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Button } from '../shared';
import NewTask from './NewTask';
import { getTasks } from '../../actions/tasks';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const TasksContainer = styled.div`
  padding: 1.5rem;
  position: relative;
  width: 100%;
  overflow-x: hidden;
`;
TasksContainer.displayName = 'TasksContainer';

const TasksHeader = styled.header`
  display: flex;
  align-items: center;

  button {
    margin-left: 2rem;
  }
`;

const TaskList = () => {
  const [showForm, setShowForm] = useState(false);
  const currentFolder = useSelector(state => state.folders.currentFolder);
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    currentFolder && dispatch(getTasks(currentFolder));
  }, [currentFolder]);

  return (
    <TasksContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <NewTask show={showForm} />
      </MuiPickersUtilsProvider>
      <TasksHeader>
        <h2>Tasks</h2>
        <Button onClick={() => setShowForm(!showForm)}>Add</Button>
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
