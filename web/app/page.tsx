"use client";
import { WobbleCardDemo } from "@/components/Cards/WobbleCardDemo";
import { FlipWordsDemo } from "@/components/FlipWordsDemo";
import FullHeaderLogic from "@/components/FullHeaderLogic";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { Container, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Home() {
  const navbarShow = useMediaQuery("(min-width: 70.25em)");
  const { authenticated } = useGlobalContext();
  return (
    <>
      {authenticated && (
        <Flex direction={navbarShow ? "row" : "column"}>
          <FullHeaderLogic navbarShow={navbarShow} />
          <Container size={"md"} mt={20}>
            <FlipWordsDemo />
            <WobbleCardDemo />
          </Container>
        </Flex>
      )}
    </>
  );
}
