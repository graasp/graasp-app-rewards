import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import Select from 'react-select';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withNamespaces } from 'react-i18next';
import {
  closeSettings,
  patchAppInstance,
  setHeaderVisibility,
} from '../../../actions';
import { options as langOptions } from '../../../constants/langs';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class Settings extends Component {
  saveSettings = (settingsToChange) => {
    const {
      settings,
      dispatchPatchAppInstance,
    } = this.props;
    const newSettings = {
      ...settings,
      ...settingsToChange,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  };

  handleChangeHeaderVisibility = () => {
    const {
      settings: { headerVisible },
    } = this.props;
    const settingsToChange = {
      headerVisible: !headerVisible,
    };
    this.saveSettings(settingsToChange);
  };

  handleClose = () => {
    const { dispatchCloseSettings } = this.props;
    this.saveSettings();
    dispatchCloseSettings();
  };

  handleChangeLanguage = (selectedLanguage) => {
    const { i18n } = this.props;
    const { value } = selectedLanguage;
    i18n.changeLanguage(value);
    const settingsToChange = {
      lang: value,
    };
    this.saveSettings(settingsToChange);
  };

  render() {
    const {
      t,
      i18n,
      classes,
      open,
      settings,
    } = this.props;

    const {
      headerVisible,
    } = settings;

    const { language } = i18n;
    const selectedLanguage = langOptions.find(langOption => langOption.value === language);

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              { t('Settings') }
            </Typography>
            <FormControlLabel
              control={(
                <Switch
                  color="primary"
                  checked={headerVisible}
                  onChange={this.handleChangeHeaderVisibility}
                  value="headerVisibility"
                />
              )}
              label={t('Header visible')}
            />
            <Select
              // default selected value is the first language option
              defaultValue={langOptions[0]}
              options={langOptions}
              value={selectedLanguage}
              onChange={this.handleChangeLanguage}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  open: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    headerVisible: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  dispatchCloseSettings: PropTypes.func.isRequired,
  dispatchPatchAppInstance: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    defaultNS: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = ({ settings }) => ({
  open: settings.open,
  settings: {
    lang: settings.lang,
    headerVisible: settings.headerVisible,
  },
});

const mapDispatchToProps = {
  dispatchCloseSettings: closeSettings,
  dispatchSetHeaderVisibility: setHeaderVisibility,
  dispatchPatchAppInstance: patchAppInstance,
};

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Settings);
const TranslatedComponent = withNamespaces()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
