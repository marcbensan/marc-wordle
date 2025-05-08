import Game from "@/components/game";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, test, vi } from "vitest";

// Mock the environment variable
vi.mock("process", () => ({
  env: { NEXT_PUBLIC_API_URL: "http://test-api.com" },
}));

global.fetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  global.fetch.mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        is_valid_word: true,
        score: [0, 0, 0, 0, 0],
      }),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

test("renders initial game board correctly", () => {
  render(<Game />);

  const guessRows = screen.getAllByTestId("motion-div");
  expect(guessRows).toHaveLength(30);

  expect(screen.getByTestId("keyboard")).toBeDefined();
});

test("updates guess when typing letters", () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });

  const firstGuessLetters = screen.getAllByTestId(/motion-div/i);
  expect(firstGuessLetters[0].textContent).toBe("h");
  expect(firstGuessLetters[1].textContent).toBe("e");
  expect(firstGuessLetters[2].textContent).toBe("l");
  expect(firstGuessLetters[3].textContent).toBe("l");
  expect(firstGuessLetters[4].textContent).toBe("o");
});

test("shows error message when submitting words less than 5 letters", () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "w" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "r" });
  fireEvent.keyDown(document, { key: "d" });
  fireEvent.keyDown(document, { key: "Enter" });

  // Should see error message
  expect(screen.getByText(/Word must be 5 letters/i)).toBeDefined();
});

test("shows error message when word is not valid", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ is_valid_word: false }),
  });

  render(<Game />);

  fireEvent.keyDown(document, { key: "a" });
  fireEvent.keyDown(document, { key: "a" });
  fireEvent.keyDown(document, { key: "a" });
  fireEvent.keyDown(document, { key: "a" });
  fireEvent.keyDown(document, { key: "a" });
  fireEvent.keyDown(document, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/Your guess is not a valid word/i)).toBeDefined();
  });
});

test("handles successful word submission and moves to next row", async () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "Enter" });

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith(
      "http://test-api.com",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ guess: "hello" }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  fireEvent.keyDown(document, { key: "w" });

  // Second row should now have "w"
  const secondRowFirstLetter = screen.getByTestId("letter-1-0");
  expect(secondRowFirstLetter.textContent).toBe("w");
});

// test("handles backspace to delete letters", () => {
//   render(<Game />);

//   fireEvent.keyDown(document, { key: "h" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "o" });
//   fireEvent.keyDown(document, { key: "Backspace" });
//   fireEvent.keyDown(document, { key: "Backspace" });

//   const firstGuessLetters = screen.getAllByTestId(/letter-0-/i);
//   expect(firstGuessLetters[0].textContent).toBe("h");
//   expect(firstGuessLetters[1].textContent).toBe("e");
//   expect(firstGuessLetters[2].textContent).toBe("l");
//   expect(firstGuessLetters[3].textContent).toBe("");
//   expect(firstGuessLetters[4].textContent).toBe("");
// });

// test("shows win message when guessing correct word", async () => {
//   // Mock winning response
//   global.fetch.mockResolvedValueOnce({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         is_valid_word: true,
//         score: [2, 2, 2, 2, 2], // All letters correct
//       }),
//   });

//   render(<Game />);

//   fireEvent.keyDown(document, { key: "h" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "o" });
//   fireEvent.keyDown(document, { key: "Enter" });

//   // Wait for win message
//   await waitFor(() => {
//     expect(screen.getByText("You win!")).toBeDefined();
//     expect(screen.getByText("Play Again")).toBeDefined();
//   });
// });

// test("shows game over message after 6 incorrect guesses", async () => {
//   render(<Game />);

//   for (let i = 0; i < 6; i++) {
//     fireEvent.keyDown(document, { key: "h" });
//     fireEvent.keyDown(document, { key: "e" });
//     fireEvent.keyDown(document, { key: "l" });
//     fireEvent.keyDown(document, { key: "l" });
//     fireEvent.keyDown(document, { key: "o" });
//     fireEvent.keyDown(document, { key: "Enter" });

//     await waitFor(() => {
//       expect(fetch).toHaveBeenCalledTimes(i + 1);
//     });
//   }

//   // Check for game over message
//   expect(screen.getByText("Game over!")).toBeDefined();
//   expect(screen.getByText("Play Again")).toBeDefined();
// });

// test("resets the game when play again button is clicked", async () => {
//   // Mock winning response
//   global.fetch.mockResolvedValueOnce({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         is_valid_word: true,
//         score: [2, 2, 2, 2, 2], // All letters correct
//       }),
//   });

//   render(<Game />);

//   fireEvent.keyDown(document, { key: "h" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "o" });
//   fireEvent.keyDown(document, { key: "Enter" });

//   // Wait for win message and play again button
//   await waitFor(() => {
//     expect(screen.getByText("Play Again")).toBeDefined();
//   });

//   fireEvent.click(screen.getByText("Play Again"));

//   fireEvent.keyDown(document, { key: "n" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "w" });

//   const firstGuessLetters = screen.getAllByTestId(/letter-0-/i);
//   expect(firstGuessLetters[0].textContent).toBe("n");
//   expect(firstGuessLetters[1].textContent).toBe("e");
//   expect(firstGuessLetters[2].textContent).toBe("w");
// });

// test("handles API errors gracefully", async () => {
//   // Mock failed API response
//   global.fetch.mockResolvedValueOnce({
//     ok: false,
//   });

//   render(<Game />);

//   fireEvent.keyDown(document, { key: "h" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "o" });
//   fireEvent.keyDown(document, { key: "Enter" });

//   // Wait for error message
//   await waitFor(() => {
//     expect(
//       screen.getByText("Error checking the word. Try again.")
//     ).toBeDefined();
//   });
// });

// test("updates keyboard letter states based on guess results", async () => {
//   // Mock response with mixed results
//   global.fetch.mockResolvedValueOnce({
//     ok: true,
//     json: () =>
//       Promise.resolve({
//         is_valid_word: true,
//         score: [1, 0, 2, 0, 0],
//       }),
//   });

//   render(<Game />);

//   fireEvent.keyDown(document, { key: "h" });
//   fireEvent.keyDown(document, { key: "e" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "l" });
//   fireEvent.keyDown(document, { key: "o" });
//   fireEvent.keyDown(document, { key: "Enter" });

//   await waitFor(() => {
//     const keyboardH = screen.getByTestId("key-h");
//     const keyboardL = screen.getByTestId("key-l");

//     expect(keyboardH.className).toContain("wrong-position");
//     expect(keyboardL.className).toContain("correct-position");
//   });
// });
