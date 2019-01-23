import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Select from 'react-select';
import _ from 'lodash';
import { postAppInstanceResource } from '../../../actions';

// todo: make dynamic
const students = [
  {
    _id: '5b56e70ab253020033364416',
    name: 'juan carlos',
  },
  {
    _id: '5c055c1083d22e0211c24ad8',
    name: 'pamela',
  },
  {
    _id: '5c055c1083d22e0211c24ad9',
    name: 'joana',
  },
  {
    _id: '5c055c1083d22e0211c24ad6',
    name: 'maria',
  },
  {
    _id: '5c055c1083d22e0211c24ad1',
    name: 'andré',
  },
  {
    _id: '5c055c1083d22e0211c24ad1',
    name: 'mashkour',
  },
];

const badges = [
  'gold',
  'silver',
  'bronze',
];

const studentOptions = students.map(({ _id, name }) => ({ value: _id, label: name }));
const badgeOptions = badges.map(badge => ({ value: badge, label: _.capitalize(badge) }));

class AssignBadgeForm extends Component {
  static propTypes = {
    dispatchPostAppInstanceResource: PropTypes.func.isRequired,
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

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
};

export default connect(null, mapDispatchToProps)(AssignBadgeForm);
