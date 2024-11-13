import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import Forum from "../../src/app/(tabs)/forum.js";
import fetchMock from "jest-fetch-mock";

jest.mock("../../src/components/Header.js", () => () => <></>);

jest.mock("expo-router", () => ({
  router: { push: jest.fn() },
}));

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("Forum", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Mostrar ActivityIndicator enquanto carrega", () => {
    render(<Forum />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("2) Mostrar FailedToFetch se não carregar", async () => {
    render(<Forum />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("3) Mostrar jogos em FlatList ao carregar", async () => {
    const mockThreads = [
      {
        id: "1",
        title: "Thread 1",
        profiles: { username: "Username 1", avatar_url: "image1.png" },
      },
      {
        id: "2",
        title: "Thread 2",
        profiles: { username: "Username 2", avatar_url: "image2.png" },
      },
      {
        id: "3",
        title: "Thread 3",
        profiles: { username: "Username 3", avatar_url: "image3.png" },
      },
    ];

    fetchMock.mockResponse(JSON.stringify(mockThreads));

    render(<Forum />);

    await waitFor(() => expect(screen.getByTestId("FlatList")).toBeTruthy());

    const flatListItems = screen.getAllByTestId("FlatListItem");

    // 6 seções iguais em Home
    expect(flatListItems.length).toBe(mockThreads.length);
  });
});
