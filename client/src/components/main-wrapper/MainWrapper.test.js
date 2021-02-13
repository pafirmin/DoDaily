import React from 'react';
import MainWrapper from './MainWrapper';
import FolderList from '../folders/Folders';
import { shallow } from 'enzyme';
import * as redux from 'react-redux';
import TaskList from '../tasks/TaskList';

describe('Main wrapper', () => {
  const useSelectorMock = jest.spyOn(redux, 'useSelector');
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  it('Renders the folder list', () => {
    const wrapper = shallow(<MainWrapper />);
    expect(wrapper.containsMatchingElement(<FolderList />)).toBe(true);
  });

  it('Renders the tasks list', () => {
    const wrapper = shallow(<MainWrapper />);
    expect(wrapper.containsMatchingElement(<TaskList />)).toBe(true);
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
