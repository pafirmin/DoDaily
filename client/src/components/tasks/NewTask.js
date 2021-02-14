import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, TextInput, TextArea } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { newTask } from '../../actions/tasks';
import { DateTimePicker } from '@material-ui/pickers';

const NewTaskForm = styled.form`
  position: fixed;
  right: ${props => (props.show ? '0' : '-500px')};
  transition: right 0.3s;
  top: ${props => props.theme.headerHeight};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 1.5rem;
  box-shadow: 3px 3px 12px #c3c3c3;

  & p {
    margin-bottom: 0.2rem;
  }

  & > * + * {
    margin-top: 1rem;
  }

  & > * {
    width: 100%;
  }
`;
NewTaskForm.displayName = 'new-task-form';

const PrioritySelect = styled.button`
  border-radius: 6px;
  flex: 1;
  padding: 0.3rem;
  background-color: ${props => (props.isSelected ? '#6f99b5' : '#f1f1f1')};
  color: ${props => (props.isSelected ? '#fff' : '#000')};
  transition: color, background-color 0.3s;

  + * {
    margin-left: 0.2rem;
  }
`;

const NewTask = ({ show }) => {
  const dispatch = useDispatch();
  const currentFolder = useSelector(state => state.folders.currentFolder);
  const titleInputRef = useRef(null);
  const [dueDate, setDueDate] = useState(null);
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });

  useEffect(() => {
    show && titleInputRef.current.focus();
  }, [show]);

  const handleSubmit = e => {
    console.log(e.target.value);
    e.preventDefault();

    // dispatch(newTask({ ...taskValues, dueDate }, currentFolder));
  };

  const handleChange = e => {
    console.log(e.target.value);
    setTaskValues({
      ...taskValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <NewTaskForm show={show} onSubmit={handleSubmit}>
      <h2>New task</h2>
      <label for="title">
        <p>Title</p>
        <TextInput
          ref={titleInputRef}
          aria-label="Task title"
          type="text"
          name="title"
          value={taskValues.title}
          onChange={handleChange}
        />
      </label>
      <label for="description">
        <p>Description</p>
        <TextArea
          aria-label="Task description"
          name="description"
          value={taskValues.description}
          onChange={handleChange}
        />
      </label>
      <label for="priority">
        <p>Priority</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PrioritySelect
            type="button"
            name="priority"
            isSelected={taskValues.priority === 'LOW'}
            value="LOW"
            onClick={handleChange}
          >
            Low
          </PrioritySelect>
          <PrioritySelect
            type="button"
            name="priority"
            isSelected={taskValues.priority === 'MEDIUM'}
            value="MEDIUM"
            onClick={handleChange}
          >
            Medium
          </PrioritySelect>
          <PrioritySelect
            type="button"
            name="priority"
            isSelected={taskValues.priority === 'HIGH'}
            value="HIGH"
            onClick={handleChange}
          >
            High
          </PrioritySelect>
        </div>
      </label>
      <div>
        <label htmlFor="dueDate">
          <DateTimePicker
            value={dueDate}
            onChange={setDueDate}
            disablePast={true}
            fullWidth={true}
            size={'medium'}
          />
        </label>
      </div>
      <Button>Add task</Button>
    </NewTaskForm>
  );
};

export default NewTask;
