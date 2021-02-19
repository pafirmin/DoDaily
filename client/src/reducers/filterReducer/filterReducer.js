import { SET_FILTER, REMOVE_FILTER } from '../../actions/types';

const initialState = [];

const filterReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_FILTER:
      return [...state, action.data];
    case REMOVE_FILTER:
      return state.filter(filter => filter !== action.data);
    default:
      return state;
  }
};

export default filterReducer;
