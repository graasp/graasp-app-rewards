import React from 'react';
import { connect } from 'react-redux';
import {
  Alert,
  Container,
} from 'reactstrap';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  patchAppInstanceResource,
  postAppInstanceResource,
  deleteAppInstanceResource,
} from '../../../actions';
import AssignedBadges from './AssignedBadges';
import AssignBadgeForm from './AssignBadgeForm';
import './TeacherView.css';

export const TeacherView = (props) => {
  const {
    // this property allow us to do translations and is injected by i18next
    t,
  } = props;

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
};

TeacherView.propTypes = {
  t: PropTypes.func.isRequired,
};

// get the app instance resources that are saved in the redux store
const mapStateToProps = state => ({
  appInstanceResources: state.appInstanceResources.content,
});

// allow this component to dispatch a post
// request to create an app instance resource
const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPatchAppInstanceResource: patchAppInstanceResource,
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(TeacherView);

export default withNamespaces('translations')(ConnectedComponent);
