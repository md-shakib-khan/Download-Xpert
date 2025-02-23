"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  sayHello: () => any;
  token: string; // Add your token here, it's just a placeholder for now. Replace it with your actual token when implementing the actual API.
}

const GlobalContext = React.createContext<GlobalContextProps | null>(null);

export const useGlobalContext = () => {
  const state = React.useContext(GlobalContext);
  if (!state) throw new Error("State Is Undefined");

  return state;
};

export const GlobalContextProvider: React.FC<GlobalProviderProps> = ({
  children,
}) => {
  const [token, setToken] = useState("");
  const sayHello: GlobalContextProps["sayHello"] = React.useCallback(() => {
    console.log("Context API Working ?");
  }, []);

  useEffect(() => {
    const userToken = Cookies.get("user_2225") as string; // Get token from cookies
    setToken(userToken);
  }, [token]);

  return (
    <GlobalContext.Provider value={{ sayHello, token }}>
      <MantineProvider>{children}</MantineProvider>
    </GlobalContext.Provider>
  );
};
