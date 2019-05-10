import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import { Table } from 'reactstrap';
import './MyBadges.css';

const renderBadges = props => {
  const { t, badges, appInstanceResources } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return (
      <tr>
        <td colSpan={5}>{t('No badges have been assigned to you yet')}</td>
      </tr>
    );
  }
  // map each app instance resource to a row in the table
  return appInstanceResources.map(({ _id, data }) => {
    const { badgeId } = data;
    // find corresponding badge objects from state
    const badgeObject = badges.find(badge => badge._id === badgeId) || {};

    // extract necessary properties
    const { label, color, icon } = badgeObject;

    // return a row for this entry
    return (
      <tr key={_id}>
        <td>
          <FontAwesomeIcon color={color} icon={icon} size="10x" />
          <Typography variant="h5">{t(label)}</Typography>
        </td>
      </tr>
    );
  });
};

const MyBadges = props => {
  const { t } = props;
  return (
    <div className="AssignedBadges">
      <Table>
        <thead>
          <tr>
            <th>{t('Trophy Room')}</th>
          </tr>
        </thead>
        <tbody>{renderBadges(props)}</tbody>
      </Table>
    </div>
  );
};

MyBadges.propTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = ({ badges, appInstanceResources }) => ({
  appInstanceResources: appInstanceResources.content,
  badges: badges.content,
});

const mapDispatchToProps = {};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyBadges);

export default withTranslation()(ConnectedComponent);
