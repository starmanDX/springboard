import React from "react";
import { render } from "@testing-library/react";
import Dog from "./Dog";

//SMOKETEST
test("it renders without crashing", () => {
  render(<Dog name="Rusty" isAdopted={true} />);
});

//SNAPSHOT TESTS
test("it matches snapshot", () => {
    const { asFragment } = render(<Dog name="Rusty" isAdopted={true}/>);
  expect(asFragment()).toMatchSnapshot();
});

test("it matches snapshot", () => {
    const { asFragment } = render(<Dog name="Rusty" isAdopted={false}/>);
    expect(asFragment()).toMatchSnapshot();
});
