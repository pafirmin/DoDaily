const initialState = [];

const taskReducer = (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case 'GET_TASKS':
      return data;
    case 'NEW_TASK':
      return [data, ...state];
    case 'TOGGLE_DONE':
      return state.map(task =>
        task._id === data._id ? { ...task, complete: !task.complete } : task
      );
    case 'CHANGE_PRIORITY':
      return state.map(task =>
        task._id === data._id ? { ...task, priority: data.priority } : task
      );
    case 'DELETE_TASK':
      return state.filter(task => task._id !== data._id);
    default:
      return state;
  }
};

export default taskReducer;
