import React from 'react';

const Task = ({ task }) => {
  return (
    <div>
      <header>
        <h3>{task.title}</h3>
      </header>
      <div>{task.description}</div>
    </div>
  );
};

export default Task;
