import Keyboard from "@/components/keyboard";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  cleanup();
});

const defaultProps = {
  letterStates: {},
};

test("Renders all keyboard keys", () => {
  render(<Keyboard {...defaultProps} />);

  "qwertyuiopasdfghjklzxcvbnm".split("").forEach((letter) => {
    const key = screen.getByText(letter.toUpperCase());
    expect(key).toBeDefined();
  });

  expect(screen.getByText("ENTER")).toBeDefined();
  expect(screen.getByText("←")).toBeDefined();
});

test("Applies default blue color to keys with no state", () => {
  render(<Keyboard {...defaultProps} />);

  "qwertyuiopasdfghjklzxcvbnm".split("").forEach((letter) => {
    const key = screen.getByText(letter.toUpperCase());
    expect(key.className).toContain("bg-wordle-secondary");
  });
});

test("Applies correct colors based on letter states", () => {
  const letterStates = {
    m: 2,
    p: 1,
    a: 0,
    c: 1,
  };

  render(<Keyboard letterStates={letterStates} />);

  const mKey = screen.getByText("M");
  const pKey = screen.getByText("P");
  const aKey = screen.getByText("A");
  const cKey = screen.getByText("C");

  expect(mKey.className).toContain("bg-green");
  expect(pKey.className).toContain("bg-yellow");
  expect(aKey.className).toContain("bg-wordle-dark");
  expect(cKey.className).toContain("bg-yellow");
});
