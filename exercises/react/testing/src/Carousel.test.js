import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

//SMOKETEST
it("should render without crashing", () => {
  render(<Carousel />);
});

//SNAPSHOT TEST
it("should match snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward then backward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show again
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
});

it("doesn't display the left arrow on first image", function () {
  const { queryByTestId } = render(<Carousel />);

  // expect first image to not have the left arrow
  let leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeNull();

  //move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect second image to have the left arrow
  leftArrow = queryByTestId("left-arrow");
  expect(leftArrow).toBeInTheDocument();
});

it("doesn't display the right arrow on third image", function () {
  const { queryByTestId } = render(<Carousel />);

  //move forward in the carousel
  let rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect third image not to have the right arrow
  rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeNull();
});
