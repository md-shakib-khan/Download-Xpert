"use client";
import {
  ActionIcon,
  Button,
  Flex,
  Group,
  ScrollArea,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import cx from "clsx";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconLogin2,
  IconMoon,
  IconPresentationAnalytics,
  IconSun,
} from "@tabler/icons-react";
import Link from "next/link";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import classes from "./NavbarNested.module.css";

const mockdata = [
  { label: "Analytics", icon: IconPresentationAnalytics, href: "/analytics" },
  { label: "Youtube", icon: IconBrandYoutube, href: "/youtube" },
  { label: "Facebook", icon: IconBrandFacebook, href: "/facebook" },
  { label: "Instagram", icon: IconBrandInstagram, href: "/instagram" },
  { label: "Tiktok", icon: IconBrandInstagram, href: "/tiktok" },
  // {
  //   label: "Market news",
  //   icon: IconNotes,
  //   initiallyOpened: true,
  //   links: [
  //     { label: "Overview", link: "/" },
  //     { label: "Forecasts", link: "/" },
  //     { label: "Outlook", link: "/" },
  //     { label: "Real time", link: "/" },
  //   ],
  // },
  // {
  //   label: "Releases",
  //   icon: IconCalendarStats,
  //   links: [
  //     { label: "Upcoming releases", link: "/" },
  //     { label: "Previous releases", link: "/" },
  //     { label: "Releases schedule", link: "/" },
  //   ],
  // },
  // { label: "Analytics", icon: IconPresentationAnalytics, href: "/analytics" },
  // { label: "Contracts", icon: IconFileAnalytics, href: "/contracts" },
  // { label: "Settings", icon: IconAdjustments, href: "/settings" },
  // {
  //   label: "Security",
  //   icon: IconLock,
  //   links: [
  //     { label: "Enable 2FA", link: "/" },
  //     { label: "Change password", link: "/" },
  //     { label: "Recovery codes", link: "/" },
  //   ],
  // },
];

export function NavbarNested() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          {/* <Logo style={{ width: 120 }} /> */}
          <Link href="/">
            <Title order={4} className="cursor-pointer">
              Download Xpert
            </Title>
          </Link>

          {/* <Code fw={700}>v3.1.2</Code> */}
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <UserButton /> */}
        <Flex
      mih={50}
      bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="center"
      align="center"
      direction="row"
      wrap="wrap"
    >
          <Link href={"/authentication"}>
          <Button leftSection={<IconLogin2 size={14} />} variant="default">
            Authentication
          </Button></Link>
         {/* <Link href={"/sign-up"}>
         <Button leftSection={<IconLogin2 size={14} />} variant="default">
            Sign Up
          </Button></Link> */}
        </Flex>
      </div>
    </nav>
  );
}
