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

import { supabase } from "../src/app/db/supabase.js";

import { Alert } from "react-native";

jest.mock("expo-router", () => ({
  useRouter: () => {
    return {
      replace: jest.fn(() => {
        console.log("bruhhhh");
      }),
    };
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

// jest.mock("../src/app/db/supabase.js", () => ({
//   supabase: {
//     auth: {
//       signInWithPassword: jest.fn(() => {
//         return { error: { message: "Erro de Login (Teste)" } };
//       }),
//     },
//   },
// }));

describe("Login", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("1) Requisitar preenchimento de campos", () => {
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

  it("2) Negar acesso não autorizado", async () => {
    jest.spyOn(supabase.auth, "signInWithPassword").mockImplementation(() => {
      return {
        error: {
          message: "Erro de Login (Teste)",
        },
      };
    });
    const alertSpy = jest.spyOn(Alert, "alert");

    render(<LoginScreen />);

    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");

    const loginButton = screen.getByTestId("loginButton");

    await act(async () => {
      await userEvent.type(emailInput, "teste");
      await userEvent.type(passwordInput, "teste");

      await loginButton.props.onClick();
    });

    // console.log(passwordInput.props.value);

    expect(alertSpy).toHaveBeenLastCalledWith("Erro", "Erro de Login (Teste)");
  });

  it("3) Permitir acesso autorizado", async () => {
    jest.spyOn(supabase.auth, "signInWithPassword").mockImplementation(() => {
      return {};
    });
    const alertSpy = jest.spyOn(Alert, "alert");

    render(<LoginScreen />);

    const emailInput = screen.getByTestId("emailInput");
    const passwordInput = screen.getByTestId("passwordInput");

    const loginButton = screen.getByTestId("loginButton");

    await act(async () => {
      await userEvent.type(emailInput, "teste");
      await userEvent.type(passwordInput, "teste");

      await loginButton.props.onClick();
    });

    // console.log(passwordInput.props.value);

    // 🤔
    expect(alertSpy).toHaveBeenCalledTimes(2);
  });
});
