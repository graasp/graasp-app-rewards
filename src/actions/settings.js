import Qs from 'qs';
import {
  CLOSE_SETTINGS,
  FLAG_GETTING_API_ENDPOINT,
  FLAG_GETTING_SETTINGS,
  GET_API_ENDPOINT_FAILED,
  GET_API_ENDPOINT_SUCCEEDED,
  GET_SETTINGS_FAILED,
  GET_SETTINGS_SUCCEEDED,
  OPEN_SETTINGS,
  SET_HEADER_VISIBILITY,
} from '../types';
import {
  BASE_API_URL,
  DEFAULT_GET_REQUEST,
  HOSTNAME_ENDPOINT,
  LOCAL_API,
} from '../config/api';
import { flag } from './common';

// flags
const flagGettingApiEndpoint = flag(FLAG_GETTING_API_ENDPOINT);
const flagGettingSettings = flag(FLAG_GETTING_SETTINGS);

/**
 * asynchronously gets the correct api endpoint from the graasp api
 * @returns {Promise<Function>}
 */
const getApiEndpoint = async () => async (dispatch) => {
  dispatch(flagGettingApiEndpoint(true));
  try {
    const parentLocationHostname = window.parent.location.hostname;
    if (parentLocationHostname === 'localhost') {
      return dispatch({
        type: GET_API_ENDPOINT_SUCCEEDED,
        payload: LOCAL_API,
      });
    }

    const url = `${BASE_API_URL + HOSTNAME_ENDPOINT}?parentLocationHostname=${parentLocationHostname}`;
    const endpoint = await fetch(url, DEFAULT_GET_REQUEST);
    return dispatch({
      type: GET_API_ENDPOINT_SUCCEEDED,
      payload: endpoint,
    });
  } catch (err) {
    return dispatch({
      type: GET_API_ENDPOINT_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingApiEndpoint(false));
  }
};

/**
 * synchronously gets the settings from the query string
 * @returns {Function}
 */
const getSettings = () => (dispatch) => {
  dispatch(flagGettingSettings(true));
  try {
    const {
      mode = 'default',
      lang = 'en',
      appInstanceId = null,
      spaceId = null,
      subSpaceId = null,
      userId = null,
      sessionId = null,
    } = Qs.parse(window.location.search, { ignoreQueryPrefix: true });
    const settings = {
      mode,
      lang,
      appInstanceId,
      userId,
      sessionId,
      spaceId,
      subSpaceId,
    };
    dispatch({
      type: GET_SETTINGS_SUCCEEDED,
      payload: settings,
    });
  } catch (err) {
    dispatch({
      type: GET_SETTINGS_FAILED,
      payload: err,
    });
  } finally {
    dispatch(flagGettingSettings(false));
  }
};

const openSettings = () => dispatch => dispatch({
  type: OPEN_SETTINGS,
});

const closeSettings = () => dispatch => dispatch({
  type: CLOSE_SETTINGS,
});

const setHeaderVisibility = visible => dispatch => dispatch({
  type: SET_HEADER_VISIBILITY,
  payload: visible,
});

export {
  getApiEndpoint,
  getSettings,
  openSettings,
  closeSettings,
  setHeaderVisibility,
};
