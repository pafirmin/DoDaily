import React from 'react';
import FolderList from './Folders';
import FolderListItem from './FolderListItem';
import NewFolder from './NewFolder';
import { Button } from '../shared';
import { shallow, render } from 'enzyme';
import * as redux from 'react-redux';

const folders = [
  { name: 'Test folder', _id: '1' },
  { name: 'Test folder 2', _id: '2' },
];

describe('Folder List', () => {
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  it('Renders', () => {
    const wrapper = shallow(<FolderList folders={folders} />);
    expect(wrapper.find('SideBar')).toHaveLength(1);
  });

  it('Creates a list of folders', () => {
    const wrapper = shallow(<FolderList folders={folders} />);
    const list = wrapper.find('ul');

    expect(list.find(FolderListItem)).toHaveLength(2);
  });
});

describe('Folder list item', () => {
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  it('Renders the name of folder passed as prop', () => {
    const wrapper = shallow(<FolderListItem folder={folders[0]} />);

    expect(wrapper.text().includes(folders[0].name)).toBe(true);
  });
});

describe('New folder form', () => {
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  it('Is hidden by default', () => {
    const wrapper = shallow(<FolderList folders={folders} />);
    expect(wrapper.find(NewFolder)).toHaveLength(0);
  });

  it('Renders on click', () => {
    const wrapper = shallow(<FolderList folders={folders} />);
    wrapper.find(Button).simulate('click');

    expect(wrapper.find(NewFolder)).toHaveLength(1);
  });
});
