import React, { useMemo } from "react";
import Task from "./Task";
import filterTasks from "../../helpers/filters";
import { useMediaQuery } from "react-responsive";
import { endOfToday, isToday, parseISO, startOfTomorrow } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../shared";
import styled from "styled-components";
import { newTaskWithDate, toggleSidebar } from "../../actions/sidebar";
import FilterMenu from "./FilterMenu";

const ListWrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => (props.isMobile ? "100%" : "60%")};

  h3 {
    font-size: 1.4em;
    margin: 1.4rem 0 0.8rem 0;
  }
`;

const Controls = styled.div`
  margin: 1rem auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const AddTaskBtn = styled(Button)`
  display: block;
  width: 12rem;
  border-radius: 15px;
`;

const FolderIcon = styled.i`
  font-size: 1.8em;
  color: #9c9c9c;
  visibility: ${(props) => (props.breakpoint ? "visible" : "hidden")};
  cursor: pointer;
`;

const TaskList = () => {
  const tasks = useSelector((state) => filterTasks(state.tasks, state.filters));
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const folderBreakpoint = useMediaQuery({ maxWidth: 1450 });
  const todayTasks = useMemo(
    () =>
      tasks
        .filter((task) => isToday(parseISO(task.dueDate)))
        .sort((a, b) => a.dueDate > b.dueDate),
    [tasks]
  );
  const futureTasks = useMemo(
    () =>
      tasks
        .filter((task) => parseISO(task.dueDate) > startOfTomorrow())
        .sort((a, b) => a.dueDate > b.dueDate),
    [tasks]
  );

  const handleAddTask = () => {
    dispatch(newTaskWithDate(endOfToday()));
  };

  return (
    <ListWrapper isMobile={isMobile}>
      <Controls>
        <FolderIcon
          breakpoint={folderBreakpoint}
          className="fas fa-folder"
          onClick={() => dispatch(toggleSidebar(3))}
        />
        <AddTaskBtn onClick={handleAddTask}>Add a task</AddTaskBtn>
        <FilterMenu />
      </Controls>
      <h3>Today</h3>
      {todayTasks.length === 0 && (
        <p style={{ margin: "1rem 2rem" }}>All clear!</p>
      )}
      <ul>
        {todayTasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
      <h3>Upcoming</h3>
      <ul>
        {futureTasks.map((task) => (
          <Task key={task._id} task={task} />
        ))}
      </ul>
    </ListWrapper>
  );
};

export default TaskList;
