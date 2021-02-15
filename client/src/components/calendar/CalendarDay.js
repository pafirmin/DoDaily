import React from 'react';
import styled from 'styled-components';

const DayWrapper = styled.div`
  border: 1px solid ${props => (props.tasks ? 'red' : 'black')};
  padding: 50% 0;
  height: 0;
`;

const CalendarDay = ({ day, tasks }) => {
  return (
    <DayWrapper tasks={tasks}>
      <span>{day}</span>
    </DayWrapper>
  );
};

export default CalendarDay;
