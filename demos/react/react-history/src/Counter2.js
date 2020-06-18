import React from "react";
import createReactClass from "create-react-class";
import CountMixin from "./CountMixin";

const Counter2 = createReactClass({
  mixins: [CountMixin],
  render: function () {
    return (
      <div>
        <div>Current count: {this.state.count}</div>
        <div>
          <button onClick={this.decrement}> Subtract 1</button>
        </div>
        <div>
          <button onClick={this.increment}> Add 1</button>
        </div>
      </div>
    );
  },
});

export default Counter2;
