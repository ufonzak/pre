import { connect } from 'react-redux';
import settingsActions from '../actions/settings';
import Settings from '../components/Settings';
import fetch from '../tools/fetch';

const mapStateToProps = (globalState, ownProps) => ({ // eslint-disable-line no-unused-vars
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
