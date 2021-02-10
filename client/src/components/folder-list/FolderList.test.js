import React from 'react';
import FolderList from './FolderList';
import { shallow } from 'enzyme';

describe('Folder List', () => {
  const folders = [
    { name: 'Test folder', _id: '1' },
    { name: 'Test folder 2', _id: '2' },
  ];
  const wrapper = shallow(<FolderList folders={folders} />);

  it('Renders', () => {
    const title = wrapper.find('h2');
    expect(title.text().includes('Your folders')).toBe(true);
  });

  it('Lists folder names', () => {
    const list = wrapper.find('ul');
    expect(list.text().includes('Test folder')).toBe(true);
  });

  it('Creates list of folders', () => {
    const list = wrapper.find('ul');
    expect(list.find('li')).toHaveLength(2);
  });
});
