import React from 'react';
import FolderList from './FolderList';
import FolderListItem from './FolderListItem';
import { shallow, render } from 'enzyme';
import * as redux from 'react-redux';

describe('Folder List', () => {
  const folders = [
    { name: 'Test folder', _id: '1' },
    { name: 'Test folder 2', _id: '2' },
  ];
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');
  const wrapper = shallow(<FolderList folders={folders} />);

  it('Renders', () => {
    const title = wrapper.find('h2');
    expect(title.text().includes('Your Folders')).toBe(true);
  });

  it('Lists folder names', () => {
    const list = wrapper.find('ul');
    expect(list.find(FolderListItem)).toHaveLength(2);
  });

  it('Creates list of folders', () => {
    const list = wrapper.find('ul');
    expect(list.find(FolderListItem)).toHaveLength(2);
  });
});

describe('Folder list item', () => {
  const useDispatchMock = jest.spyOn(redux, 'useDispatch');

  it('Renders the name of folder passed as prop', () => {
    const wrapper = shallow(<FolderListItem folder={{ name: 'test' }} />);
    expect(wrapper.text().includes('test')).toBe(true);
  });
});
