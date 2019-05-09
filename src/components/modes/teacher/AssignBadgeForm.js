import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withNamespaces } from 'react-i18next';
import { postAppInstanceResource } from '../../../actions';
import { BADGE } from '../../../config/appInstanceResourceTypes';
import './AssignBadgeForm.css';

class AssignBadgeForm extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchPostAppInstanceResource: PropTypes.func.isRequired,
    studentOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    badgeOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.element,
      value: PropTypes.string,
    })).isRequired,
  };

  state = {
    selectedStudent: null,
    selectedBadge: null,
  };

  handleChangeStudent = (value) => {
    this.setState({
      selectedStudent: value,
    });
  };

  handleChangeBadge = (value) => {
    this.setState({
      selectedBadge: value,
    });
  };

  assignBadge = () => {
    const { dispatchPostAppInstanceResource } = this.props;
    const {
      selectedStudent,
      selectedBadge,
    } = this.state;
    if (!selectedStudent || !selectedBadge) {
      return alert('You must select a student and a badge');
    }
    return dispatchPostAppInstanceResource({
      user: selectedStudent.value,
      type: BADGE,
      data: {
        badgeId: selectedBadge.value,
      },
    });
  };

  render() {
    const {
      selectedStudent,
      selectedBadge,
    } = this.state;
    const {
      t,
      studentOptions,
      badgeOptions,
    } = this.props;
    const shownBadge = badgeOptions.find(
      badge => (selectedBadge ? badge.value === selectedBadge.value : null),
    ) || null;
    if (shownBadge !== selectedBadge) {
      this.setState({
        selectedBadge: shownBadge,
      });
    }
    return (
      <Fragment>
        <Select
          className="StudentSelect"
          value={selectedStudent}
          options={studentOptions}
          onChange={this.handleChangeStudent}
          placeholder={t('Student')}
        />
        <Select
          className="BadgeSelect"
          value={shownBadge}
          onChange={this.handleChangeBadge}
          options={badgeOptions}
          placeholder={t('Prize')}
        />
        <Button
          className="AssignBadge"
          color="primary"
          onClick={this.assignBadge}
        >
          { t('Assign Badge') }
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { t } = ownProps;
  return {
    studentOptions: state.users.content.map(({ id, name }) => ({ value: id, label: name })),
    badgeOptions: state.badges.groups[state.settings.badgegroup].badges.map(({
      _id, label, color, icon,
    }) => ({
      value: _id,
      label: (
        <div>
          { `${t(label)} ` }
          <FontAwesomeIcon color={color} icon={icon} />
        </div>
      ),
    })),
  };
};

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(AssignBadgeForm);

export default withNamespaces()(ConnectedComponent);
