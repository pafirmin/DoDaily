import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { StyledLi } from '../shared';
import { setCurrentFolder } from '../../actions/folders';

const FolderListItem = ({ folder }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentFolder(folder));
  };

  return <StyledLi onClick={handleClick}>{folder.name}</StyledLi>;
};

export default FolderListItem;
