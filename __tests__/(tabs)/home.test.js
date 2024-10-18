import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import Home from "../../src/app/(tabs)/home.js";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Mostrar ActivityIndicator enquanto carrega", () => {
    render(<Home />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("Mostrar FailedToFetch se não carregar", async () => {
    render(<Home />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("Mostrar jogos em FlatList ao carregar", async () => {
    const mockGames = [
      { id: "1", name: "Game 1", header_image: "image1.png" },
      { id: "2", name: "Game 2", header_image: "image2.png" },
    ];

    fetchMock.mockResponse(JSON.stringify(mockGames));

    render(<Home />);

    await waitFor(() => expect(screen.getByTestId("FlatList")).toBeTruthy());

    const flatListItems = screen.getAllByTestId("GameCard");
    expect(flatListItems.length).toBe(2 * 6);
  });
});
