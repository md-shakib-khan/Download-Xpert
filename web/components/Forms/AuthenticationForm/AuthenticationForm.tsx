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
import { signIn } from "next-auth/react";
import { FacebookButton } from "./FacebookButton";
import { GitHubButton } from "./GitHubButton";
import { GoogleButton } from "./GoogleButton";
import { InstagramButton } from "./InstagramButton";
import { TiktokButton } from "./TiktokButton";
import { XButton } from "./XButton";
//   import { TwitterButton } from './TwitterButton';

export function AuthenticationForm(props: PaperProps) {
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

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Download Xpert, {type} with
      </Text>

      <SimpleGrid cols={2} mb="md" mt="md">
        <GoogleButton
          radius="xl"
          onClick={() => signIn("google", { redirectTo: "/" })}
        >
          Google
        </GoogleButton>
        <GitHubButton
          radius="xl"
          onClick={() => signIn("github", { redirectTo: "/" })}
        >
          Github
        </GitHubButton>
        <InstagramButton radius="xl">Instagram</InstagramButton>
        <FacebookButton radius="xl">Facebook</FacebookButton>
        <TiktokButton radius="xl">Tiktok</TiktokButton>
        <XButton radius="xl">X</XButton>
      </SimpleGrid>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit(() => {
          console.log("Form submitted", form.values);
          // TODO: Send form data to the server
          form.reset();
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
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
