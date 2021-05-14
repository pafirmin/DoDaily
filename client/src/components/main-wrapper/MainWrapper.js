import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFolders } from "../../actions/folders";
import FolderList from "../folders/Folders";
import CalendarTasks from "../sidebars/CalendarTasks";
import NewTask from "../tasks/NewTask";
import TasksWrapper from "../tasks/TasksWrapper";

const MainWrapper = () => {
  const dispatch = useDispatch();
  const { folders, isLoading } = useSelector((state) => state.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", width: "100%", position: "relative" }}>
      <FolderList folders={folders} />
      <TasksWrapper />
      <NewTask />
      <CalendarTasks />
    </div>
  );
};

export default MainWrapper;
