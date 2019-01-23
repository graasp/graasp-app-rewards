import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';
import _ from 'lodash';
import { postAppInstanceResource } from '../../../actions';

const badges = [
  'gold',
  'silver',
  'bronze',
];

const badgeOptions = badges.map(badge => ({ value: badge, label: _.capitalize(badge) }));

class AssignBadgeForm extends Component {
  static propTypes = {
    dispatchPostAppInstanceResource: PropTypes.func.isRequired,
    studentOptions: PropTypes.arrayOf(PropTypes.shape({
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
        badge: selectedBadge.value,
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
});

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignBadgeForm);
