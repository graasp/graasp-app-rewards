import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postAppInstanceResource } from '../../../actions';

class AssignBadgeForm extends Component {
  static propTypes = {
    dispatchPostAppInstanceResource: PropTypes.func.isRequired,
    studentOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })).isRequired,
    badgeOptions: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string,
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
      return alert('you must select a student and a badge');
    }
    return dispatchPostAppInstanceResource({
      data: {
        studentId: selectedStudent.value,
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
      studentOptions,
      badgeOptions,
    } = this.props;
    return (
      <Fragment>
        <Select
          className="StudentSelect"
          value={selectedStudent}
          options={studentOptions}
          onChange={this.handleChangeStudent}
        />
        <Select
          className="BadgeSelect"
          value={selectedBadge}
          onChange={this.handleChangeBadge}
          options={badgeOptions}
        />
        <Button
          color="primary"
          onClick={this.assignBadge}
        >
          Assign Badge
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  studentOptions: state.users.content.map(({ _id, name }) => ({ value: _id, label: name })),
  badgeOptions: state.badges.content.map(({ _id, label, color }) => ({
    value: _id,
    label: (
      <div>
        { `${label} ` }
        <FontAwesomeIcon color={color} icon="medal" />
      </div>
    ),
  })),
});

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignBadgeForm);
