import _ from 'lodash';
import {
  GET_APP_INSTANCE_SUCCEEDED,
  GET_CONTEXT_FAILED,
  GET_CONTEXT_SUCCEEDED,
  PATCH_APP_INSTANCE_SUCCEEDED,
} from '../types';
import {
  DEFAULT_API_HOST,
  DEFAULT_LANG,
  DEFAULT_MODE,
} from '../config/settings';
import { showErrorToast } from '../utils/toasts';

const INITIAL_STATE = {
  apiHost: DEFAULT_API_HOST,
  // the properties below come from the context via the query string
  lang: DEFAULT_LANG,
  mode: DEFAULT_MODE,
  appInstanceId: null,
  spaceId: null,
  subSpaceId: null,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_CONTEXT_SUCCEEDED:
      return {
        ...state,
        ...payload,
      };

    case GET_CONTEXT_FAILED:
      // show error to user
      showErrorToast(payload);
      return state;

    // can override context in settings.context object
    case GET_APP_INSTANCE_SUCCEEDED:
    case PATCH_APP_INSTANCE_SUCCEEDED:
      if (payload.settings && _.isPlainObject(payload.settings.context)) {
        return {
          ...state,
          ...payload.settings.context,
        };
      }
      return state;

    default:
      return state;
  }
};
