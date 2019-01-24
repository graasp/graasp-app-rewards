import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import Header from './layout/Header';
import i18nConfig from '../config/i18n';
import App from './App';

const Root = ({ headerVisible }) => (
  <I18nextProvider i18n={i18nConfig}>
    { headerVisible ? <Header /> : <Fragment />}
    <App />
  </I18nextProvider>
);

Root.propTypes = {
  headerVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  headerVisible: state.settings.headerVisible,
});

export default connect(mapStateToProps)(Root);
