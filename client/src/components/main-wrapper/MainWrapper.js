import React, { useEffect } from 'react';
import FolderList from '../folder-list/FolderList';
import { useDispatch, useSelector } from 'react-redux';
import { getFolders } from '../../actions/folders';

const MainWrapper = () => {
  const dispatch = useDispatch();
  const folders = useSelector(state => state.folders);

  useEffect(() => {
    dispatch(getFolders());
  }, []);

  return (
    <div>
      <FolderList folders={folders} />
    </div>
  );
};

export default MainWrapper;
