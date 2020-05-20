import React from "react";

function BrokenComponent(props) {
  return (
    <>
      <p>Hello, I'm a BrokenComponent!</p>
      <p>Here are some numbers:</p>
      <p>{props.favNum}</p>
      <p>{props.favNum++}</p>
    </>
  );
}

BrokenComponent.defaultProps = { favNum: 42 };

export default BrokenComponent;
