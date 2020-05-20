import React from "react";

function FixedComponent(props) {
  return (
    <>
      <p>Hello, I'm a FixedComponent!</p>
      <p>Here are some numbers:</p>
      <p>{props.favNum}</p>
      <p>{props.favNum + 1}</p>
      <p>{props.favNum + 2}</p>
      <p>{props.favNum + 3}</p>
    </>
  );
}

FixedComponent.defaultProps = {
    favNum: 42
}

export default FixedComponent;
