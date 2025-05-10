import Footer from "@/components/footer";
import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
  cleanup();
});

test("Renders the footer with correct name and title", () => {
  render(<Footer />);

  expect(screen.getByText("Marc Bensan")).toBeDefined();
  expect(screen.getByText("Software Developer")).toBeDefined();
});

test("Displays contact information correctly", () => {
  render(<Footer />);
  const phoneLink = screen.getByText("(647) 395-5441");
  const emailLink = screen.getByText("marcbensan.inq@gmail.com");

  expect(phoneLink).toBeDefined();
  expect(emailLink).toBeDefined();
});

test("Contains all social media links", () => {
  render(<Footer />);
  const linkedinLink = screen.getByText("LinkedIn");
  const githubLink = screen.getByText("GitHub");
  const instagramLink = screen.getByText("Instagram");

  expect(linkedinLink).toBeDefined();
  expect(githubLink).toBeDefined();
  expect(instagramLink).toBeDefined();
});

test("Shows the correct copyright year", () => {
  render(<Footer />);

  expect(
    screen.getByText("© 2025 Created by Marc Bensan. All rights reserved.")
  ).toBeDefined();
});

test("Renders section headings correctly", () => {
  render(<Footer />);

  expect(screen.getByText("Contact")).toBeDefined();
  expect(screen.getByText("Social")).toBeDefined();
});
