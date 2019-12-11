import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import 'react-toastify/dist/ReactToastify.css';
import Header from './layout/Header';
import i18nConfig from '../config/i18n';
import App from './App';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#5050d2',
    },
    secondary: pink,
    default: grey,
    background: {
      paper: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

const Root = ({ headerVisible }) => (
  <MuiThemeProvider theme={theme}>
    <I18nextProvider i18n={i18nConfig}>
      {headerVisible ? <Header /> : <Fragment />}
      <App />
      <ToastContainer />
    </I18nextProvider>
  </MuiThemeProvider>
);

Root.propTypes = {
  headerVisible: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ appInstance }) => ({
  // by default this is true
  headerVisible: appInstance.settings.headerVisible,
});

export default connect(mapStateToProps)(Root);
