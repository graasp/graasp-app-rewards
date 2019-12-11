import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

class Header extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    classes: PropTypes.shape({}).isRequired,
  };

  static styles = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
  };

  render() {
    const { t, classes } = this.props;
    return (
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {t('Badges')}
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
    );
  }
}

const mapStateToProps = ({ settings }) => ({
  lang: settings.lang,
  appInstanceId: settings.appInstanceId,
  spaceId: settings.spaceId,
});

const ConnectedHeader = connect(mapStateToProps)(Header);

export default withStyles(Header.styles)(withTranslation()(ConnectedHeader));
