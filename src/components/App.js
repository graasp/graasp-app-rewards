import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import TeacherView from './modes/teacher/TeacherView';
import StudentView from './modes/student/StudentView';
import './App.css';
import {
  getApiEndpoint,
  getSettings,
} from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE } from '../config/settings';
import { getAppInstance } from '../actions/appInstance';

// set up icons
library.add(faMedal);

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
    dispatchGetApiEndpoint: PropTypes.func.isRequired,
    dispatchGetSettings: PropTypes.func.isRequired,
    dispatchGetAppInstance: PropTypes.func.isRequired,
    lang: PropTypes.string,
    mode: PropTypes.string,
    appInstanceId: PropTypes.string,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
    appInstanceId: DEFAULT_MODE,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the endpoint for the api and the
    // settings from the context that come via the query string
    props.dispatchGetApiEndpoint();
    props.dispatchGetSettings();
  }

  async componentDidMount() {
    const {
      lang,
      appInstanceId,
      dispatchGetAppInstance,
    } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
    // only fetch app instance resources if app instance id is available
    if (appInstanceId) {
      await dispatchGetAppInstance();
    }
  }

  async componentDidUpdate({
    lang: prevLang,
    appInstanceId: prevAppInstanceId,
  }) {
    const {
      lang,
      appInstanceId,
      dispatchGetAppInstance,
    } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      await dispatchGetAppInstance();
    }
  }

  handleChangeLang = (lang) => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const { mode } = this.props;

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case 'teacher':
      case 'producer':
      case 'educator':
        return <TeacherView />;

      // by default go with the consumer (learner) mode
      case 'student':
      case 'consumer':
      case 'learner':
      default:
        return <StudentView />;
    }
  }
}

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang,
  mode: settings.mode,
  appInstanceId: settings.appInstanceId,
  spaceId: settings.spaceId,
});

const mapDispatchToProps = {
  dispatchGetApiEndpoint: getApiEndpoint,
  dispatchGetSettings: getSettings,
  dispatchGetAppInstance: getAppInstance,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withNamespaces()(ConnectedApp);
