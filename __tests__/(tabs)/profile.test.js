import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import Profile from "../../src/app/(tabs)/profile.js";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

jest.mock("../../src/app/db/supabase.js", () => ({
  supabase: {},
}));

describe("Profile", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Mostrar ActivityIndicator enquanto carrega", () => {
    render(<Profile />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("Mostrar FailedToFetch se não carregar", async () => {
    render(<Profile />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  // it("Mostrar jogos em FlatList ao carregar", async () => {
  //   const mockGames = [
  //     { id: "1", name: "Game 1", header_image: "image1.png" },
  //     { id: "2", name: "Game 2", header_image: "image2.png" },
  //   ];

  //   fetchMock.mockResponse(JSON.stringify(mockGames));

  //   render(<Home />);

  //   await waitFor(() => expect(screen.getByTestId("FlatList")).toBeTruthy());

  //   const flatListItems = screen.getAllByTestId("GameCard");
  //   expect(flatListItems.length).toBe(2);
  // });
});
