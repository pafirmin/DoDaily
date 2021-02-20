import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import {
  getDaysInMonth,
  getDate,
  getDay,
  parseISO,
  getMonth,
  getYear,
  format,
} from 'date-fns';
import CalendarDay from './CalendarDay';
import CalendarHeader from './CalendarHeader';
import { set } from 'lodash';

const CalendarWrapper = styled.div`
  width: ${props => (props.isMobile ? '100%' : '70%')};
  margin: 2rem auto;
`;

const CalendarMain = styled.div`
  display: grid;
  width: 100%;
  margin-top: 2rem;
  gap: ${props => (props.isMobile ? '0.1rem' : '0.3rem')};
  grid-template-columns: repeat(7, 1fr);
`;

const BlankDay = styled.div`
  padding: 50% 0;
  height: 0;
  background-color: #c3c3c3;
`;

const DayHeader = styled.div`
  padding: 0.3em;
  background-color: ${props => props.theme.secondaryColour};
  color: #fff;
`;

const Calendar = () => {
  const today = new Date();
  const tasks = useSelector(state => state.tasks);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const isMobile = useMediaQuery({ maxWidth: 800 });

  const tasksMap = useMemo(() => {
    const map = new Map();

    tasks.forEach(task => {
      const date = parseISO(task.dueDate);
      const key = [getYear(date), getMonth(date), getDate(date)].join('-');

      if (map.has(key)) {
        map.get(key).push(task);
      } else {
        map.set(key, new Array(task));
      }
    });
    return map;
  }, [tasks]);

  const getCalendarEntries = () => {
    const children = [];
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const firstDay = getDay(new Date(year, month, 0));

    for (let i = 0; i < firstDay; i++) {
      children.push(<BlankDay key={i} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const dayTasks = tasksMap.get([year, month, day].join('-'));
      const date = new Date(year, month, day);

      children.push(
        <CalendarDay key={date} day={day} date={date} tasks={dayTasks} />
      );
    }
    return children;
  };

  return (
    <CalendarWrapper isMobile={isMobile}>
      <CalendarHeader
        month={format(new Date(year, month), 'MMMM yyyy')}
        nextMonth={() => setMonth(month + 1)}
        prevMonth={() => setMonth(month - 1)}
      />
      <CalendarMain isMobile={isMobile}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {getCalendarEntries()}
      </CalendarMain>
    </CalendarWrapper>
  );
};

export default Calendar;
