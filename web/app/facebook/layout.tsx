"use client";
import FullHeaderLogic from "@/components/FullHeaderLogic";
import { Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

export default function FacebookLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarShow = useMediaQuery("(min-width: 70.25em)");
  return (
    <Flex direction={navbarShow ? "row" : "column"}>
      <FullHeaderLogic navbarShow={navbarShow} />
      {children}
    </Flex>
  );
}
