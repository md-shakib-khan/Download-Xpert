"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import {
  Avatar,
  Box,
  Burger,
  Center,
  Collapse,
  Divider,
  Drawer,
  Group,
  HoverCard,
  Menu,
  ScrollArea,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconBook,
  IconChevronDown,
  IconCode,
  IconCoin,
  IconFingerprint,
  IconHeart,
  IconLogout,
  IconMessage,
  IconPlayerPause,
  IconSettings,
  IconStar,
  IconSwitchHorizontal,
  IconTrash,
} from "@tabler/icons-react";
import cx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import classes from "./HeaderMegaMenu.module.css";

const mockdata = [
  {
    icon: IconCode,
    title: "Youtube",
    description: "This Pokémon’s cry is very loud and distracting",
    href: "/youtube",
  },
  {
    icon: IconCoin,
    title: "Facebook",
    description: "The fluid of Smeargle’s tail secretions changes",
    href: "/facebook",
  },
  {
    icon: IconBook,
    title: "Instagram",
    description: "Yanma is capable of seeing 360 degrees without",
    href: "/instagram",
  },
  {
    icon: IconFingerprint,
    title: "Tiktok",
    description: "The shell’s rounded shape and the grooves on its.",
    href: "/tiktok",
  },
  // {
  //   icon: IconChartPie3,
  //   title: "Analytics",
  //   description: "This Pokémon uses its flying ability to quickly chase",
  // },
  // {
  //   icon: IconNotification,
  //   title: "Notifications",
  //   description: "Combusken battles with the intensely hot flames it spews",
  // },
];

export function HeaderMegaMenu() {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();
  const { userProfile } = useGlobalContext();

  const links = mockdata.map((item) => (
    <UnstyledButton
      className={classes.subLink}
      key={item.title}
      onClick={() => router.push(item.href)}
    >
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon size={22} color={theme.colors.blue[6]} />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box pb={120}>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Link href="/">
            <Title order={4} className="cursor-pointer">
              Download Xpert
            </Title>
          </Link>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a href="#" className={classes.link}>
              Analytics
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Media
                    </Box>
                    <IconChevronDown size={16} color={theme.colors.blue[6]} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                {/* <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group> */}

                {/* <Divider my="sm" /> */}

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                {/* <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div> */}
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>
          </Group>

          {/* <Group visibleFrom="sm">
            <Link href="/authentication">
              <Button variant="default">Authentication</Button>
            </Link>
          </Group> */}

          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Avatar
                    src={userProfile.image}
                    alt={userProfile.name}
                    radius="xl"
                    size={20}
                  />
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {userProfile.name}
                  </Text>
                  <IconChevronDown size={12} stroke={1.5} />
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconHeart
                    size={16}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    size={16}
                    color={theme.colors.yellow[6]}
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    size={16}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}
              >
                Change account
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
                Logout
              </Menu.Item>

              <Menu.Divider />

              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item
                leftSection={<IconPlayerPause size={16} stroke={1.5} />}
              >
                Pause subscription
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={16} stroke={1.5} />}
              >
                Delete account
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          <a href="/analytics" className={classes.link}>
            Analytics
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Media
              </Box>
              <IconChevronDown size={16} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a>

          {/* <Divider my="sm" /> */}

          {/* <Group justify="center" grow pb="xl" px="md">
            <Button variant="default">Log in</Button>
            <Button>Sign up</Button>
          </Group> */}
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
