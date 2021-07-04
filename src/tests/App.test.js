import React from "react";
import { cleanup, render } from "@testing-library/react";
import App from "../components/App";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("renders content", () => {
  const { getByTestId, getByTitle } = render(<App />);
  expect(getByTestId(/search/i)).toBeVisible;
  expect(getByTitle(/movies-list/i)).toBeVisible;
});
