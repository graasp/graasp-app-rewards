import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { deleteAppInstanceResource } from '../../../actions';
import './AssignedBadges.css';

const renderAppInstanceResources = (props) => {
  const {
    badges,
    students,
    appInstanceResources,
    dispatchDeleteAppInstanceResource,
  } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return <tr><td colSpan={5}>No Badges Assigned</td></tr>;
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, user, data }) => {
    const {
      badgeId,
    } = data;
    // find corresponding student and badge objects from state
    const studentObject = students.find(student => student._id === user) || {};
    const badgeObject = badges.find(badge => badge._id === badgeId) || {};

    // extract necessary properties
    const { name } = studentObject;
    const { color } = badgeObject;

    // return a row for this entry
    return (
      <tr key={_id}>
        <th scope="row">{ _id }</th>
        <td>{ user }</td>
        <td>{ name }</td>
        <td>
          <FontAwesomeIcon color={color} icon="medal" />
        </td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="danger"
              onClick={() => dispatchDeleteAppInstanceResource(_id)}
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });
};

const AssignedBadges = props => (
  <div className="AssignedBadges">
    <h5>
        Assigned Badges
    </h5>
    <Table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student ID</th>
          <th>Name</th>
          <th>Badge</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        { renderAppInstanceResources(props) }
      </tbody>
    </Table>
  </div>
);

const mapStateToProps = state => ({
  appInstanceResources: state.appInstanceResources.content,
  students: state.users.content,
  badges: state.badges.content,
});

const mapDispatchToProps = {
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};


const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AssignedBadges);

export default ConnectedComponent;
