import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../actions/tasks';
import styled from 'styled-components';
import {
  getDaysInMonth,
  getDate,
  getDay,
  parseISO,
  getMonth,
  getYear,
} from 'date-fns';
import CalendarDay from './CalendarDay';
import { set } from 'lodash';

const CalendarWrapper = styled.div`
  display: grid;
  width: 800px;
  margin: 2rem auto;
  gap: 0.3rem;
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
  const dispatch = useDispatch();
  const [tasksTable, setTasksTable] = useState({});
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  useEffect(() => {
    setTasksTable(generateTasksTable(tasks));
  }, [tasks]);

  const generateTasksTable = tasks => {
    let table = {};
    tasks.forEach(task => {
      const dueYear = getYear(parseISO(task.dueDate));
      const dueMonth = getMonth(parseISO(task.dueDate));
      const dueDay = getDate(parseISO(task.dueDate));
      const props = [dueYear, dueMonth, dueDay];

      set(table, props.join('.'), task);
    });
    return table;
  };

  const handleNextMonth = () => {
    setMonth(month + 1);
  };

  const handlePrevMonth = () => {
    setMonth(month - 1);
  };

  const getCalendarEntries = () => {
    const children = [];
    const daysInMonth = getDaysInMonth(new Date(year, month));
    const firstDay = getDay(new Date(year, month, 0));

    for (let i = 0; i < firstDay; i++) {
      children.push(<BlankDay key={i} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const tasks = tasksTable[year]?.[month]?.[day];
      const date = new Date(year, month, day);

      children.push(
        <CalendarDay key={date} day={day} date={date} tasks={tasks} />
      );
    }
    return children;
  };

  return (
    <div style={{ width: '100%' }}>
      <CalendarWrapper>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {getCalendarEntries()}
      </CalendarWrapper>
      <button onClick={handlePrevMonth}>Previous month</button>
      <button onClick={handleNextMonth}>Next month</button>
    </div>
  );
};

export default Calendar;
