"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import axios from "axios";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  sayHello: () => any;
  authenticated: boolean;
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
  const [authenticated, setAuthenticated] = useState(false);
  const sayHello: GlobalContextProps["sayHello"] = React.useCallback(() => {
    console.log("Context API Working ?");
  }, []);

  const verify = async (token: any) => {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_WEB_SERVER_URL}/user/auth/token-verify`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      setAuthenticated(data.success);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("download_xpert_user_token");
    if (token) {
      verify(token);
    } else {
      console.log("No token found, redirecting to login");
      // TODO: Redirect to login page
      window.location.href = "/authentication";
    }
  }, []);

  return (
    <SessionProvider>
      <GlobalContext.Provider value={{ sayHello, authenticated }}>
        <MantineProvider>{children}</MantineProvider>
      </GlobalContext.Provider>
    </SessionProvider>
  );
};
