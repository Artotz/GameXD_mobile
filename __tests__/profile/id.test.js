import React from "react";
import { render, screen, waitFor } from "@testing-library/react-native";
import ProfileInfo from "../../src/app/profile/[id].js";
import fetchMock from "jest-fetch-mock";
import { supabase } from "../../src/db/supabase.js";

jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
  router: { push: jest.fn() },
  useLocalSearchParams: jest.fn(() => 1),
}));

jest.mock("../../src/components/Header.js", () => () => <></>);

jest.mock("@expo/vector-icons/FontAwesome", () => () => <></>);

describe("Profile", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Mostrar ActivityIndicator enquanto carrega", () => {
    render(<ProfileInfo />);

    expect(screen.getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("2) Mostrar FailedToFetch se não carregar", async () => {
    jest.spyOn(supabase, "from").mockImplementation(() => ({
      select: jest.fn().mockImplementation(() => ({
        eq: jest.fn().mockImplementation(() => ({
          single: jest.fn().mockImplementation(() => ({
            data: null,
          })),
        })),
      })),
    }));

    render(<ProfileInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("FailedToFetch")).toBeTruthy()
    );
  });

  it("3) Mostrar items em FlatList ao carregar", async () => {
    jest.spyOn(supabase, "from").mockImplementation(() => ({
      select: jest.fn().mockImplementation(() => ({
        eq: jest.fn().mockImplementation(() => ({
          single: jest.fn().mockImplementation(() => ({
            data: JSON.stringify({
              id: 1,
              avatar_url: "image1.png",
              username: "User 1",
            }),
          })),
        })),
      })),
    }));

    const mockProfiles = [
      { id: 1, avatar_url: "image1.png", username: "User 1" },
      { id: 2, avatar_url: "image2.png", username: "User 2" },
      { id: 3, avatar_url: "image3.png", username: "User 3" },
    ];

    const mockFavorites = [
      {
        id: 1,
        game_id: "1",
        Games: { name: "Game 1", header_image: "image1.png" },
      },
      {
        id: 2,
        game_id: "2",
        Games: { name: "Game 2", header_image: "image2.png" },
      },
      {
        id: 3,
        game_id: "3",
        Games: { name: "Game 3", header_image: "image3.png" },
      },
    ];

    const mockReviews = [
      {
        id: 1,
        game_id: "1",
        name: "Game 1",
        Games: { header_image: "image1.png" },
        profiles: { username: "Username" },
        star_rating: 3,
        review_body: "Review 1",
      },
      {
        id: 2,
        game_id: "2",
        name: "Game 2",
        Games: { header_image: "image2.png" },
        profiles: { username: "Username" },
        star_rating: 3,
        review_body: "Review 2",
      },
      {
        id: 3,
        game_id: "3",
        name: "Game 3",
        Games: { header_image: "image3.png" },
        profiles: { username: "Username" },
        star_rating: 3,
        review_body: "Review 3",
      },
    ];

    fetchMock.mockIf(/^http:\/\/127.0.0.1:3000.*$/, async (req) => {
      // console.log(req.url);

      if (req.url.includes("profiles")) {
        return JSON.stringify(mockProfiles);
      } else if (req.url.includes("favorites")) {
        return JSON.stringify(mockFavorites);
      } else if (req.url.includes("reviews")) {
        return JSON.stringify(mockReviews);
      } else {
        return {
          status: 404,
          body: "Not Found",
        };
      }
    });

    render(<ProfileInfo />);

    await waitFor(() =>
      expect(screen.getByTestId("FavoritesFlatList")).toBeTruthy()
    );
    await waitFor(() =>
      expect(screen.getByTestId("ReviewsFlatList")).toBeTruthy()
    );

    const favoritesFlatListItems = screen.getAllByTestId(
      "FavoritesFlatListItem"
    );
    expect(favoritesFlatListItems.length).toBe(mockFavorites.length);

    const reviewsFlatListItems = screen.getAllByTestId("ReviewsFlatListItem");
    expect(reviewsFlatListItems.length).toBe(mockReviews.length);
  });
});
