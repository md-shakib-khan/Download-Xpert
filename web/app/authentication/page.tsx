"use client";
import { AuthenticationForm } from "@/components/Forms/AuthenticationForm/AuthenticationForm";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useEffect } from "react";

export default function Authentication() {
  const { authenticated } = useGlobalContext();
  useEffect(() => {
    if (authenticated) {
      window.location.href = "/"; // Redirect to home page if already authenticated  // TODO: Implement real-world redirect logic here for production use.
    }
  }, [authenticated]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-[800px] w-full px-9">
        {!authenticated && <AuthenticationForm />}
      </div>
    </div>
  );
}
