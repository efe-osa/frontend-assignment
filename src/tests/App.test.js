import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "../components/App";

describe("renders without crashing", () => {
  const div = document.createElement("div");
  render(<App />, div);

  it("update search value", () => {
    const searchInput = screen.getByRole("searchbox");

    expect(searchInput).toBeTruthy();

    searchInput.focus();
    fireEvent.change(searchInput, { target: { value: "a" } });
    expect(searchInput.value).toBe("a");
  });
});

afterAll(() => cleanup());
