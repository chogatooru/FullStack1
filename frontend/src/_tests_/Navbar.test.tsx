import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';
import Navbar from "../components/navbar/Navbar";

describe("Navbar component", () => {
  const setModeMock = jest.fn();

  beforeEach(() => {
    setModeMock.mockClear();
  });

  const renderNavbar = (mode: "light" | "dark") => {
    return render(
      <Router>
        <Navbar setMode={setModeMock} mode={mode} />
      </Router>
    );
  };

  test("renders the Navbar with links and mode switch", () => {
    renderNavbar("light");

    expect(screen.getByText("PetPaw Diaries")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("View Posts")).toBeInTheDocument();
    expect(screen.getByText("Add New Post")).toBeInTheDocument();
    expect(screen.getByLabelText("theme-switch")).toBeInTheDocument();
  });

  test("switches mode when the switch is clicked", () => {
    renderNavbar("light");

    const switchElement = screen.getByLabelText("theme-switch");
    fireEvent.click(switchElement);

    expect(setModeMock).toHaveBeenCalledWith("dark");
  });

  test("opens and closes the menu in mobile view", () => {
    renderNavbar("light");

    const menuButton = screen.getByLabelText("menu");
    fireEvent.click(menuButton);

    expect(screen.getByText("Home")).toBeVisible();
    expect(screen.getByText("View Posts")).toBeVisible();
    expect(screen.getByText("Add New Post")).toBeVisible();

    const menuItems = screen.getAllByRole("menuitem");
    expect(menuItems.length).toBe(4);

    fireEvent.click(menuItems[0]);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  test("renders the Pets icon in mobile view", () => {
    renderNavbar("light");
    expect(screen.getByTestId("PetsIcon")).toBeInTheDocument();
  });
});
