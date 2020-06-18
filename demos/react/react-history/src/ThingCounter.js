import React from "react";
import withCounter from "./withCounter";

class ThingCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { thing: "💀" };
  }
  render() {
    const { thing } = this.state;
    const { count, onDecrease, onIncrease } = this.props;
    return (
      <div>
        <div>Your Things: {thing.repeat(count)}</div>
        <div>
          <button onClick={onDecrease}>Subtract</button>
          <button onClick={onIncrease}>Add</button>
        </div>
        <select
          value={thing}
          onChange={(e) => this.setState({ thing: e.target.value })}
        >
          <option value="💀">Skull</option>
          <option value="💖">Heart</option>
          <option value="😊">Smile</option>
        </select>
      </div>
    );
  }
}

export default withCounter(ThingCounter);
