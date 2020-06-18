import React from "react";

class Counter extends React.Component {
    static defaultProps = {color: "orange"}
    constructor(props) {
      super(props);
        this.state = { count: 0, isHiding: false };
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }
    increment() {
      this.setState({ count: this.state.count + 1 });
    }
    decrement() {
      this.setState({ count: this.state.count - 1 });
    }
    componentDidMount() {
        console.log("COMPONENT MOUNTED!")
    }
    componentDidUpdate() {
        console.log("COMPONENT UPDATED!")
    }
    componentWillUnmount() {
        console.log("COMPONENT ABOUT TO BE UNMOUNTED!")
    }
//   state = {
//     count: 0,
//   };
//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   };
//   decrement = () => {
//     this.setState({ count: this.state.count - 1 });
//   };
    render() {
    console.log("COMPONENT RENDERED!")
    const { color } = this.props;
    const { count } = this.state;
    return (
      <div>
        <h1 style={{ color }}>I AM A COUNTER</h1>
        <h3>Count is: {count}</h3>
        {/* <button onClick={() => this.setState({ count: count + 1 })}>
          Add 1
        </button>
        <button onClick={() => this.setState({ count: count - 1 })}>
          Subtract 1
        </button> */}
        <button onClick={this.increment}>Add 1</button>
        <button onClick={this.decrement}>Subtract1 1</button>
      </div>
    );
  }
}

export default Counter;
