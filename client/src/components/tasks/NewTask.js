import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Button, TextInput, TextArea } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { newTask } from '../../actions/tasks';
import { hideSidebar } from '../../actions/sidebar';
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

const NewTask = () => {
  const titleInputRef = useRef(null);
  const dispatch = useDispatch();
  const { folders, currentFolder } = useSelector(state => state.folders);
  const { show, date } = useSelector(state => state.sidebar);
  const [dueDate, setDueDate] = useState(date);
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });

  useEffect(() => {
    show && titleInputRef.current.focus();
  }, [show]);

  useEffect(() => {
    setDueDate(date);
  }, [date]);

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
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2>New task</h2>
        <i
          style={{ fontSize: '2em', cursor: 'pointer' }}
          aria-label="Close menu"
          className="fas fa-angle-right"
          onClick={() => dispatch(hideSidebar())}
        />
      </header>
      <label htmlFor="title">
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
      <label htmlFor="description">
        <p>Description</p>
        <TextArea
          aria-label="Task description"
          name="description"
          value={taskValues.description}
          onChange={handleChange}
          rows="4"
        />
      </label>
      <label htmlFor="priority">
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
      <label htmlFor="folder" />
      <p>Folder</p>
      <select value={currentFolder?._id}>
        {folders.map(folder => (
          <option key={folder._id} value={folder._id}>
            {folder.name}
          </option>
        ))}
      </select>
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
