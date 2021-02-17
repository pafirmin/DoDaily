import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { isPast, formatDistanceToNow, parseISO } from 'date-fns';
import { useMediaQuery } from 'react-responsive';
import { deleteTask, toggleDone } from '../../actions/tasks';

const TaskWrapper = styled.div`
  margin: 0 auto;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: 1px solid #c3c3c3;
  &:hover button {
    opacity: 1;
  }
`;

const TaskHeader = styled.header`
  padding: 0.3rem 0.5rem;
  color: #1b1b1b;
  height: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;

  h3 {
    font-size: 1.3em;
    font-weight: 600;
  }
  > * + * {
    margin-left: 0.4rem;
  }
`;
TaskHeader.displayName = 'task-header';

const TaskDescription = styled.div`
  padding: 0.5rem;
  margin-left: 1.4rem;
`;

const PriorityMarker = styled.i`
  color: ${props => props.colour};
  font-size: 1rem;
`;

const Controls = styled.div`
  margin-left: auto;

  button {
    margin-left: 1.5rem;
    font-size: 1.3em;
    opacity: 0;
    transition: opacity 0.2s;
    color: #5b5b5b;
  }
`;

const Task = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const getMarkerColour = task => {
    if (task.complete) return 'grey';
    // if (isPast(parseISO(task.dueDate))) return '#ea4e4e';

    switch (task.priority) {
      case 'LOW':
        return '#5ece5e';
      case 'MEDIUM':
        return '#ffbf00';
      case 'HIGH':
        return '#ea4e4e';
      default:
        return '#37b037';
    }
  };

  return (
    <TaskWrapper isMobile={isMobile}>
      <TaskHeader>
        <PriorityMarker
          colour={getMarkerColour(task)}
          className="fas fa-circle"
        />
        <div id="task-title" onClick={toggleDescription}>
          <h3>{task.title}</h3>
          {task.dueDate && (
            <time style={{ color: '#5c5c5c' }}>
              Due{' '}
              {formatDistanceToNow(parseISO(task.dueDate), { addSuffix: true })}
            </time>
          )}
        </div>
        <Controls>
          <button
            title="Mark as done"
            onClick={() => dispatch(toggleDone(task))}
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            title="Delete task"
            onClick={() => dispatch(deleteTask(task))}
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </Controls>
      </TaskHeader>
      {showDescription && <TaskDescription>{task.description}</TaskDescription>}
    </TaskWrapper>
  );
};

export default Task;
