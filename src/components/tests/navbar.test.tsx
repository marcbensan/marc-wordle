import Navbar from "@/components/navbar";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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

test("Match Navbar snapshot", () => {
  expect(render(<Navbar />)).toMatchSnapshot();
});

test("Renders the navbar with help icon", () => {
  render(<Navbar />);
  const helpIcon = screen.getByTestId("help-button");

  expect(helpIcon).toBeDefined();
});

test("Help dialog is initially closed", () => {
  render(<Navbar />);
  const dialogTitle = screen.queryByText(/How to Play/i);

  expect(dialogTitle).toBeNull();
});

test("Opens help dialog when help icon is clicked", async () => {
  render(<Navbar />);

  fireEvent.click(screen.getByTestId("help-button"));
  const dialogTitle = screen.getByText("How to Play");

  expect(dialogTitle).toBeDefined();
});

test("Displays all game rules in the dialog", async () => {
  render(<Navbar />);

  fireEvent.click(screen.getByTestId("help-button"));

  expect(screen.getByText(/Guess the WORDLE in 6 tries/i)).toBeDefined();
  expect(
    screen.getByText(/Each guess must be a valid 5-letter word/i)
  ).toBeDefined();
  expect(
    screen.getByText(
      /The color of the tiles will change to show how close your guess was to the word/i
    )
  ).toBeDefined();
});

test("Closes dialog when 'Got it' button is clicked", async () => {
  render(<Navbar />);

  fireEvent.click(screen.getByTestId("help-button"));

  expect(screen.getByText("How to Play")).toBeDefined();

  fireEvent.click(screen.getByText("Got it"));

  await waitFor(() => {
    expect(screen.queryByText("How to Play")).toBeNull();
  });
});

test("Redirects to home when the home button is clicked", () => {
  render(<Navbar />);
  fireEvent.click(screen.getByTestId("home-button"));

  expect(mockPush).toHaveBeenCalledWith("/");
});
