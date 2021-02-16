import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarHeader = ({ month, prevMonth, nextMonth }) => {
  return (
    <StyledHeader>
      <button
        style={{ fontSize: '2em' }}
        aria-label="Previous month"
        onClick={prevMonth}
      >
        <i className="fas fa-angle-left"></i>
      </button>
      <h2 style={{ width: '400px', textAlign: 'center' }}>{month}</h2>
      <button
        style={{ fontSize: '2em' }}
        aria-label="Next month"
        onClick={nextMonth}
      >
        <i className="fas fa-angle-right"></i>
      </button>
    </StyledHeader>
  );
};

export default CalendarHeader;
