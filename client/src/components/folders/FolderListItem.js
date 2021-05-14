import React from "react";
import { useDispatch } from "react-redux";
import { StyledLi } from "../shared";
import { setCurrentFolder } from "../../actions/folders";

const FolderListItem = ({ folder, currentFolder }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentFolder(folder));
  };

  return (
    <StyledLi onClick={handleClick} selected={currentFolder._id === folder._id}>
      {folder.name}
    </StyledLi>
  );
};

export default FolderListItem;
