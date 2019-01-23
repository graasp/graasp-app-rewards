import { combineReducers } from 'redux';
import settings from './settings';
import appInstanceResources from './appInstanceResources';
import users from './users';

export default combineReducers({
  // keys should always be lowercase
  settings,
  appInstanceResources,
  users,
});
