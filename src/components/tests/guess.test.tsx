import Guess from "@/components/guess";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  cleanup();
});

const defaultProps = {
  guess: "",
  isGuessed: false,
  guessResult: [],
};

test("Match Guess snapshot", () => {
  expect(render(<Guess {...defaultProps} />)).toMatchSnapshot();
});

test("Renders 5 empty boxes when no guess is provided", () => {
  render(<Guess {...defaultProps} />);
  const boxes = screen.getAllByTestId("motion-box");

  expect(boxes).toHaveLength(5);
  boxes.forEach((box) => {
    expect(box.className).toContain("bg-wordle-secondary");
  });
});

test("Displays letters in boxes when a guess is provided", () => {
  const guess = "smite";
  render(<Guess {...defaultProps} guess={guess} />);

  for (let i = 0; i < guess.length; i++) {
    const letter = screen.getByText(guess[i]);
    expect(letter).toBeDefined();
  }
});

test("Applies correct colors based on guessResult when guessed", async () => {
  const props = {
    guess: "hello",
    isGuessed: true,
    guessResult: [2, 1, 0, 1, 2],
  };

  render(<Guess {...props} />);
  const boxes = screen.getAllByTestId("motion-box");

  await waitFor(() => {
    expect(boxes[0].className).toContain("bg-green");
    expect(boxes[1].className).toContain("bg-yellow");
    expect(boxes[2].className).toContain("bg-wordle-dark");
    expect(boxes[3].className).toContain("bg-yellow");
    expect(boxes[4].className).toContain("bg-green");
  });
});

test("Does not apply result colors when not guessed yet", () => {
  const props = {
    guess: "hello",
    isGuessed: false,
    guessResult: [2, 1, 0, 1, 2],
  };

  render(<Guess {...props} />);
  const boxes = screen.getAllByTestId("motion-box");

  boxes.forEach((box) => {
    expect(box.className).toContain("bg-wordle-secondary");
  });
});
