import React from "react";
import createReactClass from "create-react-class";

const CountMixin = {
  getInitialState: function () {
    return {
      count: 0,
    };
  },
  increment: function () {
    this.setState({
      count: this.state.count + 1,
    });
  },
  decrement: function () {
    this.setState({
      count: this.state.count - 1,
    });
  },
};

export default CountMixin;
