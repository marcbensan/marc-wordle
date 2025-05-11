import Keyboard from "@/components/keyboard";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  cleanup();
});

const defaultProps = {
  letterStates: {},
};

test("Match Keyboard snapshot", () => {
  expect(render(<Keyboard {...defaultProps} />)).toMatchSnapshot();
});

test("Renders all keyboard keys", () => {
  render(<Keyboard {...defaultProps} />);

  "qwertyuiopasdfghjklzxcvbnm".split("").forEach((letter) => {
    const key = screen.getByText(letter.toUpperCase());
    expect(key).toBeDefined();
  });

  expect(screen.getByText("ENTER")).toBeDefined();
  expect(screen.getByText("←")).toBeDefined();
});

test("Applies default gray color to keys with no state", () => {
  render(<Keyboard {...defaultProps} />);

  "qwertyuiopasdfghjklzxcvbnm".split("").forEach((letter) => {
    const key = screen.getByText(letter.toUpperCase());
    expect(key.className).toContain("bg-wordle-secondary");
  });
});

test("Applies correct colors based on letter states", () => {
  const letterStates = {
    a: 2,
    b: 1,
    c: 0,
    d: 1,
  };

  render(<Keyboard letterStates={letterStates} />);

  const aKey = screen.getByText("A");
  const bKey = screen.getByText("B");
  const cKey = screen.getByText("C");
  const dKey = screen.getByText("D");

  expect(aKey.className).toContain("bg-green");
  expect(bKey.className).toContain("bg-yellow");
  expect(cKey.className).toContain("bg-wordle-dark");
  expect(dKey.className).toContain("bg-yellow");
});
