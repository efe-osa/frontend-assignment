import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Modal from "../components/Modal";

it("renders content", async () => {
  const movie = {
    title: "Cruella",
    image: "/rTh4K5uw9HypmpGslcKd4QfHl93.jpg",
    releaseDate: "10th June 2023",
    rating: 8,
    overview: "I an an overview",
    votes: 23496,
  };
  const imageUrl = "http://image.tmdb.org/t/p/w500";
  const closeModal = jest.fn();

  render(<Modal movie={movie} closeModal={closeModal} imageUrl={imageUrl} />);

  expect(screen.getByAltText(movie.title).src).toBe(imageUrl + movie.image);
  expect(screen.getByTitle("movie-title").textContent).toBe(movie.title);
  expect(screen.getByTitle("overview").textContent).toBe(movie.overview);
  expect(screen.getByTitle("release-date").textContent).toContain(
    movie.releaseDate
  );
  expect(screen.getByTitle("rating").textContent).toContain(movie.rating);
  screen.getByRole("button").focus();
  fireEvent.click(screen.getByRole("button"));
  fireEvent.keyDown(screen.getByRole("button"));

  expect(closeModal).toHaveBeenCalledTimes(1);
});

cleanup();
