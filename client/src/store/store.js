import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import folderReducer from '../reducers/folderReducer/folderReducer';
// import taskReducer from '../reducers/taskReducer';
// import noteReducer from '../reducers/noteReducer';
import authReducer from '../reducers/authReducer/authReducer';

const reducer = combineReducers({
  folders: folderReducer,
  // tasks: taskReducer,
  // notes: noteReducer,
  auth: authReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
