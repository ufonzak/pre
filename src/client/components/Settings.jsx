import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import * as settingsActions from '../actions/settings';
import settingsSelector from '../selectors/settings';

const FORM_ID = 'settingsForm';

class Settings extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  render() {
    const { loading, saved, error } = this.props.settings;
    const { handleSubmit, reset, submitting } = this.props;
    let message = null;
    if (error) {
      message = `Error: ${error}.`;
    } else if (loading) {
      message = 'Loading...';
    } else if (submitting) {
      message = 'Saving...';
    } else if (saved) {
      message = 'Saved.';
    }
    return (
      <div>
        <div>{message}</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="loginName">Login Name</label>
            <div>
              <Field id="loginName" name="loginName" component="input" type="text" placeholder="Login Name" />
            </div>
          </div>
          <div>
            <label htmlFor="password">Passwords</label>
            <div>
              <Field id="password" name="password" component="input" type="password" placeholder="Password" />
            </div>
          </div>
          <div>
            <button type="submit" disabled={loading || submitting}>Submit</button>
            <button type="button" disabled={loading || submitting} onClick={reset}>Reset</button>
          </div>
        </form>
      </div>);
  }
}

Settings.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  fetchSettings: PropTypes.func.isRequired,

  submitting: PropTypes.bool.isRequired,

  settings: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    saved: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = {
  fetchSettings: () => settingsActions.load(),
  onSubmit: values => settingsActions.save(values),
};

const SettingsForm = reduxForm({
  form: FORM_ID,
  enableReinitialize: true,
})(Settings);

export default connect(settingsSelector, mapDispatchToProps)(SettingsForm);
