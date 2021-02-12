import MainWrapper from './MainWrapper';
import FolderList from '../folder-list/FolderList';
import { shallow } from 'enzyme';

describe('Main wrapper', () => {
  const wrapper = shallow(<MainWrapper />);

  it('Renders the folder list', () => {
    expect(wrapper.containsMatchingElement(<FolderList />)).toBe(true);
  });
});
