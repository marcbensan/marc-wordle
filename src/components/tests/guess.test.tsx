import Guess from "@/components/guess";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      "data-testid": testId,
      "data-box-status": status,
    }) => (
      <div data-testid={testId} data-box-status={status} className={className}>
        {children}
      </div>
    ),
  },
}));

beforeEach(() => {
  cleanup();
});

const defaultProps = {
  guess: "",
  isGuessed: false,
  guessResult: [],
};

test("Renders 5 empty boxes when no guess is provided", () => {
  render(<Guess {...defaultProps} />);
  const boxes = screen.getAllByTestId("motion-div");
  expect(boxes).toHaveLength(5);

  boxes.forEach((box) => {
    expect(box.className).toContain("bg-blue-secondary");
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

  const boxes = screen.getAllByTestId("motion-div");

  await waitFor(() => {
    expect(boxes[0].className).toContain("bg-green");
    expect(boxes[1].className).toContain("bg-yellow");
    expect(boxes[2].className).toContain("bg-blue-secondary");
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

  const boxes = screen.getAllByTestId("motion-div");

  // All boxes should still have the default color
  boxes.forEach((box) => {
    expect(box.className).toContain("bg-blue-secondary");
  });
});
