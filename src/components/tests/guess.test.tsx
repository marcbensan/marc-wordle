import Guess from "@/components/guess";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock framer-motion to prevent animation issues in tests
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

// Mock the constants
vi.mock("@/constants/guess", () => ({
  BOXES_LENGTH: [0, 1, 2, 3, 4],
}));

describe("Guess Component", () => {
  const defaultProps = {
    guess: "",
    isGuessed: false,
    guessResult: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 5 empty boxes when no guess is provided", () => {
    render(<Guess {...defaultProps} />);
    const boxes = screen.getAllByTestId("motion-div");
    expect(boxes).toHaveLength(5);

    boxes.forEach((box) => {
      expect(box.className).toContain("bg-blue-secondary");
    });
  });

  it("displays letters in boxes when a guess is provided", () => {
    const guess = "hello";
    render(<Guess {...defaultProps} guess={guess} />);

    // Check each letter is rendered
    for (let i = 0; i < guess.length; i++) {
      const letter = screen.getByText(guess[i]);
      expect(letter).toBeDefined();
    }
  });

  //   it("applies correct colors based on guessResult when guessed", () => {
  //     const props = {
  //       guess: "hello",
  //       isGuessed: true,
  //       guessResult: [2, 1, 0, 1, 2], // correct, wrong position, incorrect, wrong position, correct
  //     };

  //     render(<Guess {...props} />);

  //     const boxes = screen.getAllByTestId("motion-div");

  //     // Check color classes on each box
  //     expect(boxes[0].className).toContain("bg-green");
  //     expect(boxes[1].className).toContain("bg-yellow");
  //     expect(boxes[2].className).toContain("bg-blue-secondary");
  //     expect(boxes[3].className).toContain("bg-yellow");
  //     expect(boxes[4].className).toContain("bg-green");
  //   });

  //   it("does not apply result colors when not guessed yet", () => {
  //     const props = {
  //       guess: "hello",
  //       isGuessed: false,
  //       guessResult: [2, 1, 0, 1, 2],
  //     };

  //     render(<Guess {...props} />);

  //     const boxes = screen.getAllByTestId("motion-div");

  //     // All boxes should still have the default color
  //     boxes.forEach((box) => {
  //       expect(box.className).toContain("bg-blue-secondary");
  //     });
  //   });

  //   it("does not show animations for unguessed letters", () => {
  //     const props = {
  //       guess: "he", // Only 2 letters
  //       isGuessed: false,
  //       guessResult: [],
  //     };

  //     render(<Guess {...props} />);

  //     // We should only find 2 letter elements
  //     const letterContainers = screen
  //       .getAllByTestId("motion-div")
  //       .filter((div) => div.textContent?.length === 1);
  //     expect(letterContainers).toHaveLength(2);
  //   });

  //   it("handles empty guessResult array", () => {
  //     const props = {
  //       guess: "hello",
  //       isGuessed: true,
  //       guessResult: [], // Empty result
  //     };

  //     // Should not throw errors when guessResult is empty
  //     expect(() => render(<Guess {...props} />)).not.toThrow();
  //   });
});
