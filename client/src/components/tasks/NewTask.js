import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextInput, TextArea } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import { newTask } from '../../actions/tasks';

const NewTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  box-shadow: 3px 3px 12px #c3c3c3;

  & > * + * {
    margin-top: 1rem;
  }

  & > * {
    width: 100%;
  }
`;
NewTaskForm.displayName = 'new-task-form';

const NewTask = () => {
  const dispatch = useDispatch();
  const currentFolder = useSelector(state => state.folders.currentFolder);

  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: '',
    dueDate: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(newTask(taskValues, currentFolder));
  };

  const handleChange = e => {
    setTaskValues({
      ...taskValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleDate = e => {
    setTaskValues({
      ...taskValues,
      dueDate: e._d,
    });
  };

  return (
    <div>
      <NewTaskForm onSubmit={handleSubmit}>
        <TextInput
          aria-label="Task title"
          type="text"
          name="title"
          value={taskValues.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <TextArea
          aria-label="Task description"
          name="description"
          value={taskValues.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <p>Priority:</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <label htmlFor="LOW">
            <input
              type="radio"
              name="priority"
              value="LOW"
              onChange={handleChange}
            />
            Low
          </label>
          <label htmlFor="MEDIUM">
            <input
              type="radio"
              name="priority"
              value="MEDIUM"
              onChange={handleChange}
            />
            Medium
          </label>
          <label htmlFor="HIGH">
            <input
              type="radio"
              name="priority"
              value="HIGH"
              onChange={handleChange}
            />
            High
          </label>
        </div>
        <label htmlFor="dueDate">
          <span>Due:</span>
          <Datetime name="dueOn" onChange={value => handleDate(value)} />
        </label>
        <Button>Submit new task</Button>
      </NewTaskForm>
    </div>
  );
};

export default NewTask;
