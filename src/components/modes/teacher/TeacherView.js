import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Container,
} from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  getAppInstanceResources,
  getUsers,
} from '../../../actions';
import AssignedBadges from './AssignedBadges';
import AssignBadgeForm from './AssignBadgeForm';
import './TeacherView.css';

class TeacherView extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    dispatchGetUsers: PropTypes.func.isRequired,
    appInstanceId: PropTypes.string,
    spaceId: PropTypes.string,
  };

  static defaultProps = {
    appInstanceId: null,
    spaceId: null,
  };

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
    } = this.props;

    return (
      <Container fluid className="App App-body TeacherView">
        <Alert color="primary">
          {
            t('This is the teacher view. Switch to the student view by clicking on the URL below.')
          }
          <a href="?mode=student">
            <pre>{`${window.location.host}/?mode=student`}</pre>
          </a>
        </Alert>
        <AssignBadgeForm />
        <AssignedBadges />
      </Container>
    );
  }
}

// get the app instance resources that are saved in the redux store
const mapStateToProps = state => ({
  appInstanceId: state.settings.appInstanceId,
  spaceId: state.settings.spaceId,
  appInstanceResources: state.appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
  dispatchGetUsers: getUsers,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TeacherView);

export default withNamespaces('translations')(ConnectedComponent);
