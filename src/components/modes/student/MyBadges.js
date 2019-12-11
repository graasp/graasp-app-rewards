import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
  },
  paper: {
    height: 200,
    width: 200,
  },
  grid: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
}));

const renderBadges = (props, classes) => {
  const { t, badges, appInstanceResources } = props;
  // if there are no resources, show an empty table
  if (!appInstanceResources.length) {
    return (
      <Typography variant="h4">
        {t('No badges have been assigned to you yet')}
      </Typography>
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
      <Grid item key={_id}>
        <Paper className={classes.paper}>
          <FontAwesomeIcon color={color} icon={icon} size="10x" />
          <Typography variant="h6">{t(label)}</Typography>
        </Paper>
      </Grid>
    );
  });
};

const MyBadges = props => {
  const { t } = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h2">{t('Trophy Room')}</Typography>
      <Grid container justify="center" spacing={2} className={classes.grid}>
        {renderBadges(props, classes)}
      </Grid>
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
