import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Container } from 'reactstrap';
import MyBadges from './MyBadges';
import { getAppInstanceResources } from '../../../actions';

class StudentView extends Component {
  static propTypes = {
    // t: PropTypes.func.isRequired,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    appInstanceId: PropTypes.string,
    userId: PropTypes.string,
  };

  static defaultProps = {
    appInstanceId: null,
    userId: null,
  };

  async componentDidMount() {
    const {
      userId,
      appInstanceId,
      dispatchGetAppInstanceResources,
    } = this.props;
    if (appInstanceId && userId) {
      await dispatchGetAppInstanceResources({ userId });
    }
  }

  async componentDidUpdate({
    appInstanceId: prevAppInstanceId,
    userId: prevUserId,
  }) {
    const {
      userId,
      appInstanceId,
      dispatchGetAppInstanceResources,
    } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId && userId !== prevUserId) {
      await dispatchGetAppInstanceResources({ userId });
    }
  }

  render() {
    return (
      <Container className="App App-body StudentView">
        <MyBadges />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.context.userId,
  appInstanceId: state.context.appInstanceId,
});

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentView);

export default withTranslation()(ConnectedComponent);
