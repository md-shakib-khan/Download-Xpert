"use client";
import { Avatar, Group, Text, UnstyledButton } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import classes from "./UserButton.module.css";

export function UserButton({ token }: any) {
  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    image: "",
  });
  const getProfileInfo = async () => {
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

    setUserProfile(data.data);
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <UnstyledButton className={classes.user}>
      <Group>
        <Avatar src={userProfile.image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {userProfile.name}
          </Text>

          <Text c="dimmed" size="xs">
            {userProfile.email}
          </Text>
        </div>

        <IconChevronRight size={14} stroke={1.5} />
      </Group>
    </UnstyledButton>
  );
}
