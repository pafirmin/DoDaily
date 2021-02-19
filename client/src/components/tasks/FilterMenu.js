import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setFilter, removeFilter } from '../../actions/filters';

const DropdownWrapper = styled.div`
  position: absolute;
  right: 0;
  display: inline-block;
  cursor: pointer;
  i {
    font-size: 1.8em;
    color: #9d9c9c;
  }
`;

const DropdownContent = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  padding: 0.3rem;
  position: absolute;
  right: 0;
  min-width: 170px;
  flex-direction: column;
  font-size: 1.2em;
  box-shadow: -4px 4px 8px #c3c3c3;
  background-color: #f3f3f3;
  & > * {
    padding: 0.5rem 0;
    cursor: pointer;
  }
`;

const FilterMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();

  const handleFilter = e => {
    dispatch(
      e.target.checked
        ? setFilter(e.target.value)
        : removeFilter(e.target.value)
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <DropdownWrapper>
      <i
        aria-label="Show settings"
        className="fas fa-cog"
        onClick={toggleMenu}
      ></i>
      <DropdownContent show={showMenu}>
        <label htmlFor="urgent-only">
          <input
            id="urgent-only"
            type="checkbox"
            value="URGENT_ONLY"
            onChange={handleFilter}
          />{' '}
          Urgent only
        </label>
        <label htmlFor="hide-complete">
          <input
            id="hide-complete"
            type="checkbox"
            value="HIDE_DONE"
            onChange={handleFilter}
          />{' '}
          Hide complete
        </label>
      </DropdownContent>
    </DropdownWrapper>
  );
};

export default FilterMenu;
