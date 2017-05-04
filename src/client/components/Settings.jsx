import React from 'react';
import { Field, reduxForm, reset as resetForm } from 'redux-form';
import { connect } from 'react-redux';

import settingsActions from '../actions/settings';
import { fetch, post } from '../tools/fetch';

class Settings extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  componentWillUnmount() {

  }

  render() {
    const { loading, error } = this.props.settings;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <div>{loading ? 'Loading' : 'Loaded...' }</div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Login Name</label>
            <div>
              <Field name="loginName" component="input" type="text" placeholder="Login Name" />
            </div>
          </div>
          <div>
            <label>Passwords</label>
            <div>
              <Field name="password" component="input" type="password" placeholder="Password" />
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


const FORM_ID = 'settingsForm';

const mapStateToProps = (globalState, ownProps) => ({ // eslint-disable-line no-unused-vars
  initialValues: globalState.settings.data,
  settings: globalState.settings,
});

const mapDispatchToProps = dispatch => ({
  fetchSettings: async () => {
    try {
      dispatch(settingsActions.load());
      const settingsData = await fetch('/api/settings/pre');
      dispatch(settingsActions.loaded(settingsData));
    } catch (er) {
      dispatch(settingsActions.error({ error: er.message }));
    }
  },
  onSubmit: async (values) => {
    try {
      dispatch(settingsActions.save());
      await post('/api/settings/pre', values);
      dispatch(settingsActions.saved(values));
    } catch (er) {
      dispatch(settingsActions.error({ error: er.message }));
    }
  },
});

const SettingsForm = reduxForm({
  form: FORM_ID,
  enableReinitialize: true,
})(Settings);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
