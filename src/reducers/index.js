import { combineReducers } from 'redux';
import settings from './settings';
import appInstanceResources from './appInstanceResources';
import users from './users';
import badges from './badges';
import appInstance from './appInstance';

export default combineReducers({
  // keys should always be lowercase
  settings,
  appInstanceResources,
  users,
  badges,
  appInstance,
});
