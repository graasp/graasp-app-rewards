import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Fab from '@material-ui/core/Fab';
import SettingsIcon from '@material-ui/icons/Settings';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  getAppInstanceResources,
  getUsers,
  openSettings,
} from '../../../actions';
import AssignedBadges from './AssignedBadges';
import AssignBadgeForm from './AssignBadgeForm';
import './TeacherView.css';
import Settings from './Settings';

class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    dispatchGetUsers: PropTypes.func.isRequired,
    dispatchOpenSettings: PropTypes.func.isRequired,
    appInstanceId: PropTypes.string,
    spaceId: PropTypes.string,
    classes: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    appInstanceId: null,
    spaceId: null,
  };

  static styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
      position: 'fixed',
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2,
    },
  });

  async componentDidMount() {
    const {
      appInstanceId,
      spaceId,
      dispatchGetAppInstanceResources,
      dispatchGetUsers,
    } = this.props;

    // only fetch app instance resources if app instance id is available
    if (appInstanceId) {
      await dispatchGetAppInstanceResources();
    }
    // only fetch users if app is running inside a space
    if (spaceId) {
      await dispatchGetUsers();
    }
  }

  async componentDidUpdate({
    appInstanceId: prevAppInstanceId,
    spaceId: prevSpaceId,
  }) {
    const {
      appInstanceId,
      spaceId,
      dispatchGetAppInstanceResources,
      dispatchGetUsers,
    } = this.props;

    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      await dispatchGetAppInstanceResources();
    }
    // only fetch users if app is running inside a space
    if (spaceId !== prevSpaceId) {
      await dispatchGetUsers();
    }
  }

  render() {
    const {
      // this property allow us to do translations and is injected by i18next
      t,
      classes,
      dispatchOpenSettings,
    } = this.props;

    return (
      <Container fluid className="App App-body TeacherView">
        <h3>{t('Teacher Dashboard')}</h3>
        <AssignBadgeForm />
        <AssignedBadges />
        <Settings />
        <Fab
          color="primary"
          aria-label={t('Settings')}
          className={classes.fab}
          onClick={dispatchOpenSettings}
        >
          <SettingsIcon />
        </Fab>
      </Container>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = ({ context, appInstanceResources }) => ({
  appInstanceId: context.appInstanceId,
  spaceId: context.spaceId,
  appInstanceResources: appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetUsers: getUsers,
  dispatchOpenSettings: openSettings,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherView);

export default withStyles(TeacherView.styles)(
  withTranslation()(ConnectedComponent)
);
