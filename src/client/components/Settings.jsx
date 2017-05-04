import React from 'react';
import { Field } from 'redux-form';

class Settings extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  componentWillUnmount() {
    this.props.resetAll();
  }

  render() {
    const { loading, error } = this.props.settings;
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <div>{loading ? 'Loading' : 'Done' }</div>
        <button type="button" onClick={() => { this.props.resetAll(); this.props.fetchSettings(); }}>Load</button>
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

export default Settings;
