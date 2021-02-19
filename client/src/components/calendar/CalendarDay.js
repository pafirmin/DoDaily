import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDate, showTasksOnDate } from '../../actions/sidebar';
import { isToday } from 'date-fns';
import styled from 'styled-components';

const DayWrapper = styled.div`
  padding: 50% 0;
  height: 0;
  position: relative;
  overflow-y: hidden;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 2px #a1a1a1;
  }
`;

const DayContent = styled.div`
  border: ${props => (props.isToday ? '2px solid #ea4e4e' : 'none')};
  background-color: ${props => (props.tasks ? '#c8f7ae' : '#f1f1f1;')};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0.2rem;
`;

const CalendarDay = ({ day, date, tasks }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <DayWrapper>
      <DayContent
        isToday={isToday(date)}
        tasks={tasks}
        onClick={e => dispatch(showTasksOnDate(tasks, date))}
      >
        <span>{day}</span>
      </DayContent>
    </DayWrapper>
  );
};

export default CalendarDay;
