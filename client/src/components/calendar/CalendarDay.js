import React from 'react';
import { useDispatch } from 'react-redux';
import { setDate } from '../../actions/sidebar';
import styled from 'styled-components';

const DayWrapper = styled.div`
  padding: 50% 0;
  height: 0;
  position: relative;
  cursor: pointer;
`;

const DayContent = styled.div`
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
  return (
    <DayWrapper>
      <DayContent tasks={tasks} onClick={() => dispatch(setDate(date))}>
        <span>{day}</span>
      </DayContent>
    </DayWrapper>
  );
};

export default CalendarDay;
