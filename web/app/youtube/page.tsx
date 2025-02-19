"use client";
import { ArticleCard } from "@/components/Cards/ArticleCard/ArticleCard";
import { PlaceholdersAndVanishInputDemo } from "@/components/Inputs/PlaceholdersAndVanishInputDemo";
import { Button, Flex, Grid } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export default function YoutubePage() {
  return (
    <div className="w-[99%]">
      <PlaceholdersAndVanishInputDemo />
      <Flex justify={"center"} mb={80}>
        <Button className="" rightSection={<IconDownload size={14} />}>
          Download
        </Button>
      </Flex>
      <Grid p={20}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Grid.Col key={index} span={{ base: 12, md: 6, lg: 3 }}>
            <ArticleCard />
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
