"use client";
import { useGlobalContext } from "@/context/GlobalContextProvider";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";

export function UserButton() {
  const { userProfile, token } = useGlobalContext();

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={userProfile.image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {userProfile.name}
          </Text>

          <Text c="dimmed" size="xs">
            {userProfile.provider !== "manual"
              ? userProfile.providerEmail
              : userProfile.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
