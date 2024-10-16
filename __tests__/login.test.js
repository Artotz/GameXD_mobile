import React from "react";
import {
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  userEvent,
} from "@testing-library/react-native";
import LoginScreen from "../src/app/login.js";
import fetchMock from "jest-fetch-mock";

import { Alert } from "react-native";

jest.mock("expo-router", () => ({
  useRouter: () => {
    {
      replace: jest.fn();
    }
  },
  Link: () => <></>,
}));

jest.mock("expo-status-bar", () => ({
  StatusBar: () => <></>,
}));

jest.mock("react-native-vector-icons/FontAwesome", () => () => <></>);

// jest.mock("../src/app/db/supabase.js", () => ({
//   supabase: { auth: { signInWithPassword: jest.fn() } },
// }));

jest.mock("../src/app/db/supabase.js", () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(() => {
        return { error: { message: "Erro de Login (Teste)" } };
      }),
    },
  },
}));

describe("Login", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("Requisitar preenchimento de campos", () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    render(<LoginScreen />);

    const loginButton = screen.getByTestId("loginButton");

    loginButton.props.onClick();

    // console.log(alertSpy);

    expect(alertSpy).toHaveBeenCalledWith(
      "Erro",
      "Por favor, preencha todos os campos."
    );
  });

  it("Negar acesso não autorizado", async () => {
    const alertSpy = jest.spyOn(Alert, "alert");

    render(<LoginScreen />);

    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");

    const loginButton = screen.getByTestId("loginButton");

    await act(async () => {
      // emailInput.props.onChangeText(new Event("aaa"));
      // passwordInput.props.onChangeText(new Event("aaa"));

      await userEvent.type(emailInput, "teste");
      await userEvent.type(passwordInput, "teste");

      loginButton.props.onClick();
    });

    // console.log(passwordInput.props);

    expect(alertSpy).toHaveBeenLastCalledWith("Erro", "Erro de Login (Teste)");
  });
});
