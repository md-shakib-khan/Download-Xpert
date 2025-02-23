"use client";
import { AuthenticationForm } from "@/components/Forms/AuthenticationForm/AuthenticationForm";

export default function Authentication() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-[800px] w-full px-9">
        <AuthenticationForm />
      </div>
    </div>
  );
}
