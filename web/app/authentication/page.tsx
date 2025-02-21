"use client";
import { AuthenticationForm } from "@/components/Forms/AuthenticationForm/AuthenticationForm";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Authentication() {
  const { authenticated } = useGlobalContext();
  const router = useRouter();
  useEffect(() => {
    if (authenticated) {
      router.push("/");
      return;
    }
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-[800px] w-full px-9">
        {!authenticated && <AuthenticationForm />}
      </div>
    </div>
  );
}
