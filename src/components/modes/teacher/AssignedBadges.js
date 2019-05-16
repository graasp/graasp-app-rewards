import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Table } from 'reactstrap';
import { withTranslation } from 'react-i18next';
import { deleteAppInstanceResource } from '../../../actions';
import './AssignedBadges.css';
import { BADGE } from '../../../config/appInstanceResourceTypes';

const renderAppInstanceResources = props => {
  const {
    t,
    badges,
    students,
    appInstanceResources,
    dispatchDeleteAppInstanceResource,
  } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return (
      <tr>
        <td colSpan={5}>No Badges Assigned</td>
      </tr>
    );
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, user, data, type }) => {
    if (type !== BADGE) {
      return <Fragment key={_id} />;
    }
    const { badgeId } = data;
    // find corresponding student and badge objects from state
    const studentObject = students.find(student => student.id === user) || {};
    const badgeObject = badges.find(badge => badge._id === badgeId) || {};

    // extract necessary properties
    const { name } = studentObject;
    const { label, color, icon } = badgeObject;

    // return a row for this entry
    return (
      <tr key={_id}>
        <td>{name}</td>
        <td>
          {`${t(label)} `}
          <FontAwesomeIcon color={color} icon={icon} />
        </td>
        <td>
          <ButtonGroup>
            <Button
              size="sm"
              color="danger"
              onClick={() => dispatchDeleteAppInstanceResource(_id)}
            >
              {t('Delete')}
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });
};

const AssignedBadges = props => {
  const { t } = props;
  return (
    <div className="AssignedBadges">
      <h5>{t('List of Assigned Badges')}</h5>
      <Table>
        <thead>
          <tr>
            <th>{t('Name')}</th>
            <th>{t('Badge')}</th>
            <th>{t('Actions')}</th>
          </tr>
        </thead>
        <tbody>{renderAppInstanceResources(props)}</tbody>
      </Table>
    </div>
  );
};

AssignedBadges.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  appInstanceResources: state.appInstanceResources.content,
  students: state.users.content,
  badges: state.badges.content,
});

const mapDispatchToProps = {
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignedBadges);

export default withTranslation()(ConnectedComponent);
