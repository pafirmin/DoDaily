import React, { useState } from 'react';
import styled from 'styled-components';
import { isPast, formatDistanceToNow, parseISO } from 'date-fns';
import { useMediaQuery } from 'react-responsive';

const TaskWrapper = styled.div`
  /* box-shadow: 0px 0px 4px #c3c3c3; */
  margin: 0 auto;
  padding: 0.5rem 0;
  width: 100%;
  /* border-radius: 20px; */
  border-bottom: 1px solid #c3c3c3;
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

const Task = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
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
      <TaskHeader onClick={toggleDescription}>
        <PriorityMarker
          colour={getMarkerColour(task)}
          className="fas fa-circle"
        />
        <div>
          <h3>{task.title}</h3>
          {task.dueDate && (
            <time style={{ color: '#5c5c5c' }}>
              Due{' '}
              {formatDistanceToNow(parseISO(task.dueDate), { addSuffix: true })}
            </time>
          )}
        </div>
      </TaskHeader>
      {showDescription && <TaskDescription>{task.description}</TaskDescription>}
    </TaskWrapper>
  );
};

export default Task;
