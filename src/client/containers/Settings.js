import { connect } from 'react-redux';
import settingsActions from '../actions/settings';
import Settings from '../components/Settings';
import { fetch, post } from '../tools/fetch';
import { reduxForm, reset as resetForm } from 'redux-form';

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
      dispatch(settingsActions.saved());
    } catch (er) {
      dispatch(settingsActions.error({ error: er.message }));
    }
  },
  resetAll: () => {
    dispatch(settingsActions.reset());
    resetForm('settingsForm');
  },
});

const SettingsForm = reduxForm({
  form: 'settingsForm',
})(Settings);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
