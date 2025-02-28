"use client";
import {
  Anchor,
  Button,
  Checkbox,
  Divider,
  Group,
  Paper,
  PaperProps,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { FacebookButton } from "./FacebookButton";
import { GitHubButton } from "./GitHubButton";
import { GoogleButton } from "./GoogleButton";
import { InstagramButton } from "./InstagramButton";
import { TiktokButton } from "./TiktokButton";
import { XButton } from "./XButton";

import axios from "axios";
import { useRouter } from "next/navigation";

export function AuthenticationForm(props: PaperProps) {
  const router = useRouter();
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      if (type === "register") {
        // Register User
        const response = await axios.post(
          `${
            process.env.NODE_ENV === "development"
              ? process.env.NEXT_PUBLIC_WEB_SERVER_URL_DEV
              : process.env.NEXT_PUBLIC_WEB_SERVER_URL_PRO
          }/user/auth/manual/register`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
          },
          { withCredentials: true }
        );
        // Handle registration response (e.g., redirect, show message)
        console.log("Registered successfully", response.data);
        if (response.data.success) {
          Cookies.set("user_2225", response.data.token);
          window.location.href = "/";
        }
      } else {
        // Login User
        const response = await axios.post(
          `${
            process.env.NODE_ENV === "development"
              ? process.env.NEXT_PUBLIC_WEB_SERVER_URL_DEV
              : process.env.NEXT_PUBLIC_WEB_SERVER_URL_PRO
          }/user/auth/manual/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );
        // Handle login response (e.g., store token, redirect, show message)
        console.log("Logged in successfully", response.data);

        if (response.data.success) {
          Cookies.set("user_2225", response.data.token);
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.error("Error during form submission", error);
    }

    // Reset the form after submission
    form.reset();
  };

  const googleLogin = () => {
    // Implement Google login logic here
    window.location.href =
      process.env.NODE_ENV === "development"
        ? `${process.env.NEXT_PUBLIC_WEB_SERVER_URL_DEV}/auth/google`
        : `${process.env.NEXT_PUBLIC_WEB_SERVER_URL_PRO}/auth/google` || "/";
  };

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Download Xpert, {type} with
      </Text>

      <SimpleGrid cols={2} mb="md" mt="md">
        <GoogleButton radius="xl" onClick={googleLogin}>
          Google
        </GoogleButton>
        <GitHubButton radius="xl" onClick={() => {}}>
          Github
        </GitHubButton>
        <InstagramButton radius="xl">Instagram</InstagramButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
        <TiktokButton radius="xl">Tiktok</TiktokButton>
        <XButton radius="xl">X</XButton>
      </SimpleGrid>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
