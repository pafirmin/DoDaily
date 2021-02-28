import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getDaysInMonth, getDay, addDays, parseISO, format } from "date-fns";
import CalendarDay from "./CalendarDay";
import CalendarHeader from "./CalendarHeader";

const CalendarWrapper = styled.div`
  width: 70%;
  margin: 2rem auto;

  @media (maxwidth: 800px) {
    width: 100%;
  }
`;

const CalendarMain = styled.div`
  display: grid;
  width: 100%;
  margin-top: 2rem;
  gap: 0.3rem;
  grid-template-columns: repeat(7, 1fr);

  @media (max-width: 800px) {
    gap: 0.1rem;
  }
`;

const BlankDay = styled.div`
  padding: 50% 0;
  height: 0;
  background-color: #c3c3c3;
`;

const DayHeader = styled.div`
  padding: 0.3em;
  background-color: ${(props) => props.theme.secondaryColour};
  color: #fff;
`;

const Calendar = () => {
  const today = new Date();
  const baseYear = today.getYear();
  const tasks = useSelector((state) => state.tasks);
  const [month, setMonth] = useState(today.getMonth());

  const tasksMap = useMemo(() => {
    const map = new Map();

    tasks.forEach((task) => {
      const date = parseISO(task.dueDate);
      const key = [date.getYear(), date.getMonth(), date.getDate()].join("-");

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
    const baseDate = new Date(baseYear, month, 1);
    const daysInMonth = getDaysInMonth(baseDate);
    const firstDay = getDay(baseDate);

    for (let i = 0; i < firstDay - 1; i++) {
      children.push(<BlankDay key={i} />);
    }
    for (let day = 0; day < daysInMonth; day++) {
      const date = addDays(baseDate, day);
      const dayTasks = tasksMap.get(
        [date.getYear(), date.getMonth(), day + 1].join("-")
      );

      children.push(
        <CalendarDay key={date} day={day + 1} date={date} tasks={dayTasks} />
      );
    }
    return children;
  };

  return (
    <CalendarWrapper>
      <CalendarHeader
        month={format(new Date(baseYear, month), "MMMM yyyy")}
        nextMonth={() => setMonth(month + 1)}
        prevMonth={() => setMonth(month - 1)}
      />
      <CalendarMain>
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        {getCalendarEntries()}
      </CalendarMain>
    </CalendarWrapper>
  );
};

export default Calendar;
