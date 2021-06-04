import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTasksOnDate } from "../../actions/sidebar";
import { isToday } from "date-fns";
import styled from "styled-components";

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
  border: ${(props) => (props.isToday ? "2px solid #91db68" : "none")};
  background-color: ${(props) =>
    props.heat > 0
      ? `rgba(253, 119, 67, ${Math.min(props.heat / 10, 1)})`
      : "#f1f1f1;"};
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0.2rem;
`;

const CalendarDay = ({ day, date, tasks }) => {
  const dispatch = useDispatch();
  const [intensity, setIntensity] = useState(0);

  const taskWeightReducer = (accum, task) => {
    switch (task.priority) {
      case "HIGH":
        return accum + 2;
      case "MEDIUM":
        return accum + 0.5;
      default:
        return accum + 1;
    }
  };

  useEffect(() => {
    if (tasks) {
      const taskIntensity = tasks.reduce(taskWeightReducer, 0);

      setIntensity(taskIntensity);
    }
  }, [tasks]);

  return (
    <DayWrapper>
      <DayContent
        isToday={isToday(date)}
        heat={intensity}
        onClick={() => dispatch(showTasksOnDate(date))}
      >
        <span>{day}</span>
      </DayContent>
    </DayWrapper>
  );
};

export default CalendarDay;
