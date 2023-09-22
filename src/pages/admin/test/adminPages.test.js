import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import AdminPages from "../adminPages";
import "@testing-library/jest-dom/extend-expect";

const mockStore = configureStore([]);
const mockLinks = [
  { title: "Link 1", url: "https://example.com/1" },
  { title: "Link 2", url: "https://example.com/2" },
];

describe("AdminPages Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ links: mockLinks });
  });

  const renderAdminPages = () =>
    render(
      <Provider store={store}>
        <AdminPages />
      </Provider>
    );

  it("renders without errors", () => {
    renderAdminPages();
    expect(screen.getByText("LinkDung App")).toBeInTheDocument();
  });

  it("displays links correctly", () => {
    renderAdminPages();

    mockLinks.forEach((link) => {
      expect(screen.getByText(link.title)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: link.title })).toHaveAttribute(
        "href",
        link.url
      );
    });
  });

  describe("Modal Actions", () => {
    it("opens the create modal when the add button is clicked", () => {
      renderAdminPages();

      const addButton = screen.getByRole("button", { name: "Add Link" });

      expect(addButton).toBeInTheDocument();

      fireEvent.click(addButton);

      expect(screen.getByText("Create Profile")).toBeInTheDocument();
    });

    it("deletes a link when the delete button is clicked", () => {
      renderAdminPages();

      const deleteButtons = screen
        .getAllByRole("button")
        .filter((button) => button.textContent === "Delete");

      expect(deleteButtons.length).toBeGreaterThan(0);

      fireEvent.click(deleteButtons[0]);
    });
  });
});
