import React from 'react';

import { connect } from 'react-redux';

const ReduxDemo = ({ reduxState, count, increment, incrementAsync }) => (
  <div className="ReduxDemo">
    <div className="text-center m-3">
      <h1>Count: {count}</h1>
    </div>
    <div className="row">
      <div className="col text-center">
        <button className="btn btn-primary btn-sm" onClick={() => increment(1)}>
          Click Me (NOW)
        </button>
      </div>
      <div className="col text-center">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => increment(10)}
        >
          Click Me (NOW)
        </button>
      </div>
      <div className="col text-center">
        <button
          className="btn btn-warning btn-sm"
          onClick={() => incrementAsync(1)}
        >
          Click Me (LATER)
        </button>
      </div>
    </div>
    <pre>
      <code>{JSON.stringify({ reduxState }, null, 2)}</code>
    </pre>
  </div>
);

export default connect(
  state => ({ reduxState: state, count: state.count }),
  dispatch => ({
    increment: val => dispatch.count.increment(val),
    incrementAsync: val => dispatch.count.incrementAsync(val),
  }),
)(ReduxDemo);
