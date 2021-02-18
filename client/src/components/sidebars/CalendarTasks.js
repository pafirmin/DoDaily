import React from 'react';
import { Button, SlideOut } from '../shared/';
import { useDispatch, useSelector } from 'react-redux';
import Task from '../tasks/Task';
import { format, isSameDay, parseISO } from 'date-fns';
import { toggleSidebar } from '../../actions/sidebar';
import styled from 'styled-components';

const NewTaskBtn = styled(Button)`
  margin: 1rem auto;
  display: block;
`;

const CalendarTasks = () => {
  const SIDEBAR_ID = 2;
  const dispatch = useDispatch();
  const { date, show } = useSelector(state => state.sidebar);
  const tasks = useSelector(state =>
    state.tasks.filter(task => isSameDay(parseISO(task.dueDate), date))
  );

  return (
    <SlideOut show={show === SIDEBAR_ID}>
      <h2>Tasks for {format(date, 'do MMMM')}</h2>
      <NewTaskBtn onClick={() => dispatch(toggleSidebar(1))}>
        Add a task
      </NewTaskBtn>
      <ul>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </SlideOut>
  );
};

export default CalendarTasks;
