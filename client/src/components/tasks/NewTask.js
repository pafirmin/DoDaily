import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Button, TextInput, TextArea, SlideOut } from '../shared';
import { useDispatch, useSelector } from 'react-redux';
import { newTask } from '../../actions/tasks';
import { hideSidebar, setDate } from '../../actions/sidebar';
import DatePicker from 'react-datepicker';
import { isSameMinute, endOfToday, endOfTomorrow, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const NewTaskForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & p {
    margin-bottom: 0.5rem;
  }

  & > * + * {
    margin-top: 1rem;
  }

  & > * {
    width: 100%;
  }
`;
NewTaskForm.displayName = 'new-task-form';

const SelectButton = styled.button`
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NewTask = () => {
  const SIDEBAR_ID = 1;
  const titleInputRef = useRef(null);
  const dispatch = useDispatch();
  const { folders, currentFolder } = useSelector(state => state.folders);
  const { show, date } = useSelector(state => state.sidebar);
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'LOW',
  });
  const today = useMemo(() => endOfToday(), [show]);
  const tomorrow = useMemo(() => endOfTomorrow(), [show]);

  useEffect(() => {
    show && titleInputRef.current.focus();
  }, [show]);

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(newTask({ ...taskValues, dueDate: date }, currentFolder));
  };

  const handleChange = e => {
    setTaskValues({
      ...taskValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <SlideOut show={show === SIDEBAR_ID}>
      <NewTaskForm onSubmit={handleSubmit}>
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>New task</h2>
          <i
            style={{ fontSize: '2em', cursor: 'pointer', color: '#a7a7a7' }}
            aria-label="Close menu"
            className="fas fa-times"
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
          <ButtonGroup>
            <SelectButton
              type="button"
              name="priority"
              value="LOW"
              isSelected={taskValues.priority === 'LOW'}
              onClick={handleChange}
            >
              Low
            </SelectButton>
            <SelectButton
              type="button"
              name="priority"
              value="MEDIUM"
              isSelected={taskValues.priority === 'MEDIUM'}
              onClick={handleChange}
            >
              Medium
            </SelectButton>
            <SelectButton
              type="button"
              name="priority"
              value="HIGH"
              isSelected={taskValues.priority === 'HIGH'}
              onClick={handleChange}
            >
              High
            </SelectButton>
          </ButtonGroup>
        </label>
        <label htmlFor="folder">
          <p>Folder</p>
          <select
            value={currentFolder?._id || folders[0]?._id}
            style={{ width: '100%' }}
          >
            {folders.map(folder => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </label>
        <label style={{ width: '100%' }}>
          <p>When?</p>
          <ButtonGroup>
            <SelectButton
              type="button"
              onClick={() => dispatch(setDate(today))}
              isSelected={isSameMinute(date, today)}
            >
              By end of day
            </SelectButton>
            <SelectButton
              type="button"
              onClick={() => dispatch(setDate(tomorrow))}
              isSelected={isSameMinute(date, tomorrow)}
            >
              Tomorrow
            </SelectButton>
          </ButtonGroup>
        </label>
        <DatePicker
          className="date-picker"
          selected={date}
          showTimeSelect
          onChange={val => dispatch(setDate(val))}
          dateFormat="MMMM d, yyyy h:mm aa"
          minDate={subDays(new Date(), 0)}
          popperPlacement="bottom-end"
        />
        <Button>Add task</Button>
      </NewTaskForm>
    </SlideOut>
  );
};

export default NewTask;
