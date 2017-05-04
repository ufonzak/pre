import React from 'react';

export default class Settings extends React.Component {
  componentDidMount() {
    this.props.fetchSettings();
  }

  render() {
    const { data, loading, error } = this.props.settings;
    return (
      <div>
        {loading ? 'Loading' : 'done'}
        {data ? data.loginName : null}
      </div>);
  }
}
