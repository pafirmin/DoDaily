import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../actions/tasks';
import styled from 'styled-components';
import { getDaysInMonth, getDate, parseISO, getMonth, getYear } from 'date-fns';
import CalendarDay from './CalendarDay';
import { set } from 'lodash';

const CalendarWrapper = styled.div`
  display: grid;
  width: 800px;
  margin: 0 auto;
  gap: 0.3rem;
  grid-template-columns: repeat(7, 1fr);
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

  const getCalendarDays = () => {
    const children = [];
    const daysInMonth = getDaysInMonth(new Date(year, month));
    for (let day = 1; day <= daysInMonth; day++) {
      const tasks = tasksTable[year]?.[month]?.[day];

      children.push(<CalendarDay key={day} day={day} tasks={tasks} />);
    }
    return children;
  };

  return (
    <div style={{ width: '100%' }}>
      <CalendarWrapper>{getCalendarDays()}</CalendarWrapper>
      <button onClick={handlePrevMonth}>Previous month</button>
      <button onClick={handleNextMonth}>Next month</button>
    </div>
  );
};

export default Calendar;
