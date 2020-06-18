import React from "react";

class CounterWrapper extends React.Component {
  state = { count: 0 };

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  };
  render() {
    return (
      <div>
        {this.props.render({
          increment: this.increment,
          decrement: this.decrement,
          count: this.state.count,
        })}
      </div>
    );
  }
}

export default CounterWrapper;
