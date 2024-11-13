import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import ForumInfo from "../../src/app/forum/[id].js";
import fetchMock from "jest-fetch-mock";

jest.mock("../../src/components/Header.js", () => () => <></>);

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  useLocalSearchParams: jest.fn(() => 1),
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("ForumInfo", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Mostrar ActivityIndicator enquanto carrega", () => {
    render(<ForumInfo />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("2) Mostrar FailedToFetch se não carregar", async () => {
    render(<ForumInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("3) Mostrar informações do jogo ao carregar", async () => {
    const mockThread = { title: "Thread 1", description: "Description 1" };

    fetchMock.mockResponse(JSON.stringify(mockThread));

    render(<ForumInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("ThreadInfoContainer")).toBeTruthy()
    );
  });
});
