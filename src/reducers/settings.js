import {
  GET_API_ENDPOINT_SUCCEEDED,
  GET_SETTINGS_SUCCEEDED,
  OPEN_SETTINGS,
  CLOSE_SETTINGS,
  SET_HEADER_VISIBILITY,
  SET_BADGE_GROUP,
} from '../types';

const INITIAL_STATE = {
  endpoint: null,
  // the properties below come from the context via the query string
  lang: 'en',
  appInstanceId: null,
  spaceId: null,
  subSpaceId: null,
  open: false,
  headerVisible: true,
  badgeGroup: 0,
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GET_API_ENDPOINT_SUCCEEDED:
      return {
        ...state,
        endpoint: payload,
      };
    case GET_SETTINGS_SUCCEEDED:
      return {
        ...state,
        ...payload,
      };
    case OPEN_SETTINGS:
      return {
        ...state,
        open: true,
      };
    case CLOSE_SETTINGS:
      return {
        ...state,
        open: false,
      };
    case SET_HEADER_VISIBILITY:
      return {
        ...state,
        headerVisible: payload,
      };
    case SET_BADGE_GROUP:
      return {
        ...state,
        badgeGroup: payload,
      };
    default:
      return state;
  }
};
