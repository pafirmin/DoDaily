import React from "react";
import { endOfYesterday } from "date-fns";
import { Button, SlideOut } from "../shared/";
import { useDispatch, useSelector } from "react-redux";
import Task from "../tasks/Task";
import { format, isSameDay, parseISO } from "date-fns";
import { toggleSidebar, hideSidebar } from "../../actions/sidebar";
import styled from "styled-components";

const NewTaskBtn = styled(Button)`
  margin: 1rem auto;
  display: block;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    font-size: 1.6em;
  }

  i {
    font-size: 2rem;
  }
`;

const CalendarTasks = () => {
  const SIDEBAR_ID = 2;
  const dispatch = useDispatch();
  const { date, show } = useSelector((state) => state.sidebar);
  const tasks = useSelector((state) =>
    state.tasks.filter((task) => isSameDay(parseISO(task.dueDate), date))
  );

  return (
    <SlideOut show={show === SIDEBAR_ID}>
      <Header>
        <h2>Tasks for {format(date, "do MMMM")}</h2>
        <i
          style={{ fontSize: "2em", cursor: "pointer", color: "#a7a7a7" }}
          aria-label="Close menu"
          className="fas fa-times"
          onClick={() => dispatch(hideSidebar(SIDEBAR_ID))}
        ></i>
      </Header>
      <NewTaskBtn
        disabled={date < endOfYesterday()}
        onClick={() => dispatch(toggleSidebar(1))}
      >
        Add a task
      </NewTaskBtn>
      {tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </ul>
      ) : (
        <p style={{ textAlign: "center" }}>All clear!</p>
      )}
    </SlideOut>
  );
};

export default CalendarTasks;
