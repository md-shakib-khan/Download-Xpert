"use client";
import {
  Button,
  Group,
  ScrollArea,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconAdjustments,
  IconCalendarStats,
  IconFileAnalytics,
  IconGauge,
  IconLock,
  IconMoon,
  IconNotes,
  IconPresentationAnalytics,
  IconSun,
} from "@tabler/icons-react";
import { Logo } from "./Logo";
import { LinksGroup } from "./NavbarLinksGroup/NavbarLinksGroup";
import classes from "./NavbarNested.module.css";
import { UserButton } from "./UserButton/UserButton";

const mockdata = [
  { label: "Dashboard", icon: IconGauge },
  {
    label: "Market news",
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
  {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
      { label: "Upcoming releases", link: "/" },
      { label: "Previous releases", link: "/" },
      { label: "Releases schedule", link: "/" },
    ],
  },
  { label: "Analytics", icon: IconPresentationAnalytics },
  { label: "Contracts", icon: IconFileAnalytics },
  { label: "Settings", icon: IconAdjustments },
  {
    label: "Security",
    icon: IconLock,
    links: [
      { label: "Enable 2FA", link: "/" },
      { label: "Change password", link: "/" },
      { label: "Recovery codes", link: "/" },
    ],
  },
];

export function NavbarNested() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));
  function capitalizeFirstLetter(str: String) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: 120 }} />
          {/* <Code fw={700}>v3.1.2</Code> */}
          <Button
            leftSection={
              colorScheme === "light" ? (
                <IconMoon size={14} />
              ) : (
                <IconSun size={14} />
              )
            }
            variant="default"
            onClick={() =>
              setColorScheme(
                colorScheme === "light"
                  ? "dark"
                  : colorScheme === "dark"
                  ? "auto"
                  : "light"
              )
            }
          >
            {capitalizeFirstLetter(colorScheme)}
          </Button>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
