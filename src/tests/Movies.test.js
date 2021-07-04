import React from "react";
import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import Movies from "../components/Movies";

describe("movies", () => {
  it("renders movie list", async () => {
    render(<Movies searchItem="" />);
    await waitFor(() => screen.getByRole("list"));
    expect(screen.getByRole("list")).toBeTruthy();

    await waitFor(() => screen.getAllByRole("list-item"));
    expect(screen.getAllByRole("list-item")).not.toBeFalsy();
  });

  it("render movie modal on click", async () => {
    render(<Movies searchItem="" />);
    await waitFor(() => screen.getAllByRole("list-item"));
    const firstMovie = screen.getAllByRole("list-item")[0];

    firstMovie.focus();
    fireEvent.click(firstMovie);
    expect(await screen.findByTestId(/movie-modal/)).toBeTruthy();

    fireEvent.click(screen.getByAltText("close"));
    expect(screen.queryByTestId(/movie-modal/)).toBeNull();
  });

  it("render movie modal on keyDown", async () => {
    render(<Movies searchItem="" />);
    await waitFor(() => screen.getAllByRole("list-item"));
    const firstMovie = screen.getAllByRole("list-item")[0];
    firstMovie.focus();
    fireEvent.keyDown(firstMovie, { key: "Enter", code: "Enter" });
    expect(await screen.findByTestId(/movie-modal/)).toBeTruthy();

    fireEvent.click(screen.getByAltText("close"));
    expect(screen.queryByTestId(/movie-modal/)).toBeNull();
  });
});
