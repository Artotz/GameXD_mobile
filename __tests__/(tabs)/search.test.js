import React from "react";
import {
  render,
  screen,
  act,
  waitFor,
  userEvent,
} from "@testing-library/react-native";
import Search from "../../src/app/(tabs)/search.js";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("Search", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Mostrar ActivityIndicator enquanto carrega", async () => {
    render(<Search />);

    const searchInput = screen.getByTestId("SearchInput");

    await act(async () => {
      await userEvent.type(searchInput, "teste");
    });

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  jest.setTimeout(30000);

  it("2) Mostrar FailedToFetch se não carregar", async () => {
    render(<Search />);

    const searchInput = screen.getByTestId("SearchInput");

    await act(async () => {
      await userEvent.type(searchInput, "teste");
    });

    await new Promise((r) => setTimeout(r, 1000));

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("3) Mostrar jogos em FlatList ao carregar", async () => {
    const mockGames = [
      { id: "1", name: "Game 1", header_image: "image1.png" },
      { id: "2", name: "Game 2", header_image: "image2.png" },
      { id: "3", name: "Game 3", header_image: "image3.png" },
    ];

    fetchMock.mockResponse(JSON.stringify(mockGames));

    render(<Search />);

    const searchInput = screen.getByTestId("SearchInput");

    await act(async () => {
      await userEvent.type(searchInput, "teste");
    });

    await new Promise((r) => setTimeout(r, 1000));

    await waitFor(() => expect(screen.getByTestId("FlatList")).toBeTruthy());

    const flatListItems = screen.getAllByTestId("FlatListItem");

    // 6 seções iguais em Home
    expect(flatListItems.length).toBe(mockGames.length);
  });
});
