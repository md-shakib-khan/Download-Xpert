"use client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

interface GlobalProviderProps {
  children?: React.ReactNode;
}

interface GlobalContextProps {
  sayHello: () => any;
  token: string; // Add your token here, it's just a placeholder for now. Replace it with your actual token when implementing the actual API.
  userProfile: any;
  setUserProfile: (userProfile: any) => any;
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
  const [userProfile, setUserProfile] = useState<any | null>({
    name: "",
    email: "",
    image: "",
    provider: "",
    providerEmail: "",
  });
  const sayHello: GlobalContextProps["sayHello"] = React.useCallback(() => {
    console.log("Context API Working ?");
  }, []);

  const getProfileInfo = async () => {
    if (!token) return;
    const { data } = await axios.get(
      `${
        process.env.NODE_ENV === "development"
          ? process.env.NEXT_PUBLIC_WEB_SERVER_URL_DEV
          : process.env.NEXT_PUBLIC_WEB_SERVER_URL_PRO
      }/user/profile-info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(data.data);

    setUserProfile(data.data);
  };

  useEffect(() => {
    const userToken = Cookies.get("user_2225") as string; // Get token from cookies
    setToken(userToken);
  }, []);

  useEffect(() => {
    if (token) {
      alert("Token Found");
      getProfileInfo(); // Fetch profile info if the token is available
    }
  }, [token]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <GlobalContext.Provider
      value={{ sayHello, token, userProfile, setUserProfile }}
    >
      <MantineProvider>{children}</MantineProvider>
    </GlobalContext.Provider>
  );
};
