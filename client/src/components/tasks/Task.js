import React from 'react';
import styled from 'styled-components';
import { isPast, formatDistanceToNow, parseISO } from 'date-fns';

const TaskWrapper = styled.div`
  box-shadow: 0px 0px 12px #c3c3c3;
  margin-top: 1rem;
  max-width: 80%;
`;

const TaskHeader = styled.header`
  padding: 0.5rem;
  background: ${props => props.background};
  color: #fff;
  h3 {
    font-size: 1.4em;
  }
`;

const TaskDescription = styled.div`
  padding: 0.5rem;
`;

const Task = ({ task }) => {
  const getHeaderColour = task => {
    if (task.complete) return 'grey';
    if (isPast(parseISO(task.dueDate))) return '#cc2727';

    switch (task.priority) {
      case 'LOW':
        return '#37b037';
      case 'MEDIUM':
        return 'yellow';
      case 'HIGH':
        return '#cc2727';
      default:
        return '#37b037';
    }
  };

  return (
    <TaskWrapper>
      <TaskHeader background={getHeaderColour(task)}>
        <h3>{task.title}</h3>
        {task.dueDate && (
          <time>
            Due{' '}
            {formatDistanceToNow(parseISO(task.dueDate), { addSuffix: true })}
          </time>
        )}
      </TaskHeader>
      <TaskDescription>{task.description}</TaskDescription>
    </TaskWrapper>
  );
};

export default Task;
