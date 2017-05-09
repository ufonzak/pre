import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getHdo } from '../selectors/hdo';
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

const mapDispatchToProps = {
  loadHdo: () => hdoActions.load(),
};

export default connect(getHdo, mapDispatchToProps)(Hdo);
