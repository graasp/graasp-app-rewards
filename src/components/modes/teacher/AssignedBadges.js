import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { deleteAppInstanceResource } from '../../../actions';
import './AssignedBadges.css';

const renderAppInstanceResources = (props) => {
  const {
    students,
    appInstanceResources,
    dispatchDeleteAppInstanceResource,
  } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return <tr><td colSpan={5}>No Badges Assigned</td></tr>;
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, data }) => {
    const {
      studentId,
      badge,
    } = data;
    const studentObject = students.find(student => student._id === studentId) || {};
    const { name } = studentObject;
    return (
      <tr key={_id}>
        <th scope="row">{ _id }</th>
        <td>{ studentId }</td>
        <td>{ name }</td>
        <td>{ badge }</td>
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
});

const mapDispatchToProps = {
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};


const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AssignedBadges);

export default ConnectedComponent;
