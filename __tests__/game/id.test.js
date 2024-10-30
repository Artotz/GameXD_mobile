import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import GameInfo from "../../src/app/game/[id].js";
import fetchMock from "jest-fetch-mock";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(() => 1),
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("GameInfo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Mostrar ActivityIndicator enquanto carrega", () => {
    render(<GameInfo />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("2) Mostrar FailedToFetch se não carregar", async () => {
    render(<GameInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("3) Mostrar informações do jogo ao carregar", async () => {
    const mockGame = { id: "1", name: "Game 1", header_image: "image1.png" };

    fetchMock.mockResponse(JSON.stringify(mockGame));

    render(<GameInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("GameInfoContainer")).toBeTruthy()
    );
  });
});
