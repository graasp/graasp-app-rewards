import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from 'reactstrap';
import './MyBadges.css';

const renderBadges = (props) => {
  const {
    badges,
    appInstanceResources,
  } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return <tr><td colSpan={5}>No Badges Assigned</td></tr>;
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, data }) => {
    const {
      badgeId,
    } = data;
    // find corresponding badge objects from state
    const badgeObject = badges.find(badge => badge._id === badgeId) || {};

    // extract necessary properties
    const { color } = badgeObject;
    const appName = 'My App';
    const resourceName = 'My Resource';

    // return a row for this entry
    return (
      <tr key={_id}>
        <td>{ appName }</td>
        <td>{ resourceName }</td>
        <td>
          <FontAwesomeIcon color={color} icon="medal" />
        </td>
      </tr>
    );
  });
};

const MyBadges = props => (
  <div className="AssignedBadges">
    <h5>
        My Badges
    </h5>
    <Table>
      <thead>
        <tr>
          <th>App</th>
          <th>Resource</th>
          <th>Badge</th>
        </tr>
      </thead>
      <tbody>
        { renderBadges(props) }
      </tbody>
    </Table>
  </div>
);

const mapStateToProps = state => ({
  appInstanceResources: state.appInstanceResources.content,
  badges: state.badges.content,
});

const mapDispatchToProps = {};


const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyBadges);

export default ConnectedComponent;
