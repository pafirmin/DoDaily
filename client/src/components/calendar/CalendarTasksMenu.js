import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SlideOut from '../shared';
import Task from '../tasks/Task';

const CalendarTasksMenu = tasks => {
  const SIDEBAR_ID = 2;
  const dispatch = useDispatch();
  const { active } = useSelector(state => state.sidebar);

  return (
    <SlideOut show={active === SIDEBAR_ID}>
      <ul>
        {tasks.map(task => (
          <Task task={task._id} task={task} />
        ))}
      </ul>
    </SlideOut>
  );
};

export default CalendarTasksMenu;
