import Game from "@/components/game";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

vi.stubEnv("NEXT_PUBLIC_API_URL", "http://test-api.com");

global.fetch = vi.fn();

beforeEach(() => {
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () =>
      Promise.resolve({
        is_valid_word: true,
        score: [0, 0, 0, 0, 0],
      }),
  });

  vi.stubEnv("NEXT_PUBLIC_API_URL", "http://test-api.com");

  cleanup();
});

test("Renders initial game board", () => {
  render(<Game />);

  const guessRows = screen.getAllByTestId("motion-box");
  expect(guessRows).toHaveLength(30);

  expect(screen.getByTestId("keyboard")).toBeDefined();
});

test("Updates guess when typing letters", () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });

  const guessLetters = screen.getAllByTestId(/motion-letter/i);
  expect(guessLetters[0].textContent).toBe("h");
  expect(guessLetters[1].textContent).toBe("e");
  expect(guessLetters[2].textContent).toBe("l");
  expect(guessLetters[3].textContent).toBe("l");
  expect(guessLetters[4].textContent).toBe("o");
});

test("Shows error message when submitting words less than 5 letters", () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "w" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "r" });
  fireEvent.keyDown(document, { key: "d" });
  fireEvent.keyDown(document, { key: "Enter" });

  expect(screen.getByText(/Word must be 5 letters/i)).toBeDefined();
});

test("Shows error message when word is not valid", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
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

test("Handles successful submission", async () => {
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
});

test("Handles backspace to delete letters", () => {
  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "Backspace" });
  fireEvent.keyDown(document, { key: "Backspace" });

  const guessLetters = screen.getAllByTestId("motion-box");
  expect(guessLetters[0].textContent).toBe("h");
  expect(guessLetters[1].textContent).toBe("e");
  expect(guessLetters[2].textContent).toBe("l");
  expect(guessLetters[3].textContent).toBe("");
  expect(guessLetters[4].textContent).toBe("");
});

test("Shows win message when guessing the correct word", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        is_valid_word: true,
        score: [2, 2, 2, 2, 2],
      }),
  });

  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText(/You win!/i)).toBeDefined();
    expect(screen.getByText(/Play Again/i)).toBeDefined();
  });
});

test("Shows game over message after 6 incorrect guesses", async () => {
  render(<Game />);

  for (let i = 0; i < 6; i++) {
    fireEvent.keyDown(document, { key: "h" });
    fireEvent.keyDown(document, { key: "e" });
    fireEvent.keyDown(document, { key: "l" });
    fireEvent.keyDown(document, { key: "l" });
    fireEvent.keyDown(document, { key: "o" });
    fireEvent.keyDown(document, { key: "Enter" });

    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  expect(screen.getByText(/Game over!/i)).toBeDefined();
  expect(screen.getByText(/Play Again/i)).toBeDefined();
}, 1500);

test("Resets the game when play again button is clicked", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        is_valid_word: true,
        score: [2, 2, 2, 2, 2],
      }),
  });

  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "Enter" });

  await waitFor(() => {
    expect(screen.getByText("Play Again")).toBeDefined();
  });

  fireEvent.click(screen.getByText("Play Again"));

  fireEvent.keyDown(document, { key: "n" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "w" });

  const firstGuessLetters = screen.getAllByTestId(/motion-letter/i);
  expect(firstGuessLetters[0].innerHTML).toBe("n");
  expect(firstGuessLetters[1].innerHTML).toBe("e");
  expect(firstGuessLetters[2].innerHTML).toBe("w");
});

test("Handles API errors", async () => {
  global.fetch = vi.fn().mockResolvedValueOnce({
    ok: false,
  });

  render(<Game />);

  fireEvent.keyDown(document, { key: "h" });
  fireEvent.keyDown(document, { key: "e" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "l" });
  fireEvent.keyDown(document, { key: "o" });
  fireEvent.keyDown(document, { key: "Enter" });

  await waitFor(() => {
    expect(
      screen.getByText("Error checking the word. Try again.")
    ).toBeDefined();
  });
});
