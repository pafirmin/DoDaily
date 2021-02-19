import React from 'react';
import { useDispatch } from 'react-redux';
import { StyledLi } from '../shared';
import { setCurrentFolder } from '../../actions/folders';
import { hideSidebar } from '../../actions/sidebar';

const FolderListItem = ({ folder }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentFolder(folder));
  };

  return <StyledLi onClick={handleClick}>{folder.name}</StyledLi>;
};

export default FolderListItem;
