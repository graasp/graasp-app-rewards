import { combineReducers } from 'redux';
import settings from './settings';
import context from './context';
import appInstanceResources from './appInstanceResources';
import users from './users';
import badges from './badges';
import appInstance from './appInstance';

export default combineReducers({
  // keys should always be lowercase
  context,
  settings,
  appInstanceResources,
  users,
  appInstance,
  badges,
});
