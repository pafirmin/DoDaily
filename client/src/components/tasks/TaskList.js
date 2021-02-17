import React, { useMemo, useCallback } from 'react';
import Task from './Task';
import { useMediaQuery } from 'react-responsive';
import { endOfToday, isToday, parseISO, startOfTomorrow } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../shared';
import styled from 'styled-components';
import { setDate } from '../../actions/sidebar';

const ListWrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => (props.isMobile ? '100%' : '60%')};

  h3 {
    font-size: 1.4em;
  }
`;

const AddTaskBtn = styled(Button)`
  display: block;
  margin: 1rem auto;
  width: 12rem;
  border-radius: 15px;
`;

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const todayTasks = useCallback(
    () => tasks.filter(task => isToday(parseISO(task.dueDate))),
    [tasks]
  );
  const futureTasks = useCallback(
    () => tasks.filter(task => parseISO(task.dueDate) > startOfTomorrow()),
    [tasks]
  );

  const handleAddTask = () => {
    dispatch(setDate(endOfToday()));
  };

  return (
    <ListWrapper isMobile={isMobile}>
      <AddTaskBtn onClick={handleAddTask}>Add a task</AddTaskBtn>
      <h3>Today</h3>
      {!todayTasks.length && <p style={{ margin: '1rem 2rem' }}>All clear!</p>}
      <ul>
        {todayTasks().map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
      <h3>Upcoming</h3>
      <ul>
        {futureTasks().map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </ListWrapper>
  );
};

export default TaskList;
