import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetch } from '../tools/fetch';
import hdoSelector from '../selectors/hdo';
import * as hdoActions from '../actions/hdo';

class Hdo extends React.Component {
  componentDidMount() {
    this.props.loadHdo();
  }

  render() {
    const { loading, error, hdoData } = this.props;
    if (loading || error) {
      return <div>{loading ? 'Loading...' : `Error: ${error}`}</div>;
    }
    if (!hdoData) {
      return null;
    }
    return (
      <div>
        <h2>Low plan today:</h2>
        <ul>
          {hdoData.lowPlan.map(interval =>
            (<li key={interval.from}>{`${interval.from} - ${interval.to}`}</li>)
          )}
        </ul>
      </div>
    );
  }
}

Hdo.propTypes = {
  loadHdo: PropTypes.func.isRequired,

  hdoData: PropTypes.shape({
    lowPlan: PropTypes.arrayOf(PropTypes.shape({
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })),
  }),

  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  loadHdo: async () => {
    try {
      dispatch(hdoActions.load());
      const hdoData = await fetch('/api/hdo/today');
      dispatch(hdoActions.loaded(hdoData));
    } catch (er) {
      dispatch(hdoActions.error(er.message));
    }
  },
});

export default connect(hdoSelector, mapDispatchToProps)(Hdo);
