import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import folderReducer from '../reducers/folderReducer/folderReducer';
import taskReducer from '../reducers/taskReducer/taskReducer';
import authReducer from '../reducers/authReducer/authReducer';
import alertsReducer from '../reducers/alertsReducer/alertsReducer';
import sidebarReducer from '../reducers/sidebarReducer/sidebarReducer';
import filterReducer from '../reducers/filterReducer/filterReducer';

const reducer = combineReducers({
  folders: folderReducer,
  tasks: taskReducer,
  auth: authReducer,
  alerts: alertsReducer,
  sidebar: sidebarReducer,
  filters: filterReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
