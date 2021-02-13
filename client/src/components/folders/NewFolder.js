import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { newFolder } from '../../actions/folders';
import { Button, TextInput } from '../shared';

const NewFolderForm = styled.form`
  display: flex;
  width: 100%;
  margin-top: 1rem;
`;
NewFolderForm.displayName = 'NewFolder';

const NewFolder = () => {
  const dispatch = useDispatch();
  const newFolderRef = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(newFolder({ name: newFolderRef.current.value }));
  };

  return (
    <NewFolderForm onSubmit={handleSubmit}>
      <TextInput
        ref={newFolderRef}
        type="text"
        name="name"
        placeholder="New folder name"
        required={true}
      />
      <Button>Add</Button>
    </NewFolderForm>
  );
};

export default NewFolder;
