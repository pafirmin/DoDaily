import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getTasks } from '../../actions/tasks';
import { setCurrentFolder } from '../../actions/folders';

const StyledLi = styled.li`
  font-size: 1.4em;
  cursor: pointer;

  + * {
    margin-top: 0.5rem;
  }
`;

const FolderListItem = ({ folder }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentFolder(folder));
  };

  return <StyledLi onClick={handleClick}>{folder.name}</StyledLi>;
};

export default FolderListItem;
