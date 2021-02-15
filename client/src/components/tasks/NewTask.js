import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, TextInput, TextArea } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { newTask } from '../../actions/tasks';
import DatePicker from 'react-datepicker';
import { subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const NewTaskForm = styled.form`
  position: fixed;
  right: ${props => (props.show ? '0' : '-500px')};
  transition: right 0.3s;
  top: ${props => props.theme.headerHeight};
  height: 100%;
  display: flex;
  width: 350px;
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
  const [dueDate, setDueDate] = useState(new Date());
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });

  useEffect(() => {
    show && titleInputRef.current.focus();
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(newTask({ ...taskValues, dueDate }, currentFolder));
  };

  const handleChange = e => {
    setTaskValues({
      ...taskValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <NewTaskForm show={show} onSubmit={handleSubmit}>
      <h2>New task</h2>
      <label for="title">
        <p>Title*</p>
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
          rows="4"
        />
      </label>
      <label for="priority">
        <p>Priority*</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <PrioritySelect
            type="button"
            name="priority"
            value="LOW"
            isSelected={taskValues.priority === 'LOW'}
            onClick={handleChange}
          >
            Low
          </PrioritySelect>
          <PrioritySelect
            type="button"
            name="priority"
            value="MEDIUM"
            isSelected={taskValues.priority === 'MEDIUM'}
            onClick={handleChange}
          >
            Medium
          </PrioritySelect>
          <PrioritySelect
            type="button"
            name="priority"
            value="HIGH"
            isSelected={taskValues.priority === 'HIGH'}
            onClick={handleChange}
          >
            High
          </PrioritySelect>
        </div>
      </label>
      <label style={{ width: '100%' }}>
        <p>Due</p>
        <DatePicker
          className="date-picker"
          selected={dueDate}
          showTimeSelect
          onChange={date => setDueDate(date)}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={subDays(new Date(), 0)}
          popperPlacement="bottom-end"
        />
      </label>
      <Button>Add task</Button>
    </NewTaskForm>
  );
};

export default NewTask;
