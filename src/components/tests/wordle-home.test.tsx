import WordleHome from "@/components/wordle-home";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, test, vi } from "vitest";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

beforeEach(() => {
  cleanup();
});

test("Match WordleHome snapshot", () => {
  expect(render(<WordleHome />)).toMatchSnapshot();
});

test("Renders the WordleHome component correctly", () => {
  render(<WordleHome />);

  expect(screen.getByText(/Enjoy a quick game of/i)).toBeDefined();
  expect(screen.getByText("WORDLE")).toBeDefined();
  expect(screen.getByText("PLAY")).toBeDefined();
});

test("Redirects to game page when PLAY button is clicked", () => {
  render(<WordleHome />);
  fireEvent.click(screen.getByText("PLAY"));

  expect(mockPush).toHaveBeenCalledWith("/game");
});
