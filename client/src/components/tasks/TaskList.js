import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../shared';
import styled from 'styled-components';
import { toggleSidebar } from '../../actions/sidebar';

const AddTaskBtn = styled(Button)`
  display: block;
  margin: 0 auto;
  width: 12rem;
  border-radius: 15px;
`;
const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: '2rem' }}>
      <AddTaskBtn onClick={() => dispatch(toggleSidebar())}>
        Add a task
      </AddTaskBtn>
      <ul>
        {tasks.map(task => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
