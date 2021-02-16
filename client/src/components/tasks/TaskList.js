import React, { useEffect, useState } from 'react';
import Task from './Task';
import { useSelector } from 'react-redux';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);

  return (
    <ul>
      {tasks.map(task => (
        <Task key={task._id} task={task} />
      ))}
    </ul>
  );
};

export default TaskList;
