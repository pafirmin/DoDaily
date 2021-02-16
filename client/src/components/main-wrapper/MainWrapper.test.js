import React from 'react';
import MainWrapper from './MainWrapper';
import FolderList from '../folders/Folders';
import { shallow, render } from 'enzyme';
import * as redux from 'react-redux';
import TasksWrapper from '../tasks/TasksWrapper';

describe('Main wrapper', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  beforeEach(() => {
    useSelectorMock.mockReturnValue({
      currentFolder: 'Test folder',
      folders: [],
    });
  });

  it('Renders the folder list', () => {
    const wrapper = shallow(<MainWrapper />);
    expect(wrapper.containsMatchingElement(<FolderList />)).toBe(true);
  });

  it('Renders the tasks section', () => {
    const wrapper = shallow(<MainWrapper />);
    expect(wrapper.containsMatchingElement(<TasksWrapper />)).toBe(true);
  });

  it('Calls UseDispatch on mount', () => {
    shallow(<MainWrapper />);
    expect(useDispatchMock).toHaveBeenCalled();
  });

  it('Calls UseSelector on mount', () => {
    shallow(<MainWrapper />);
    expect(useSelectorMock).toHaveBeenCalled();
  });
});
