import React from "react";
import { Box, Text, Link } from "@chakra-ui/core";
import NextLink from "next/link";

export default function Footer() {
  return (
    <Box
      justifyContent="space-around"
      d="flex"
      flexDir={["column", "row"]}
      textAlign="center"
      color="white"
      bg="#6390FF"
      h={[100, 150]}
    >
      <Box verticalAlign="middle" mt={[null, 30]}>
        <NextLink href="/om">
          <Link>
            <Text as="u" fontSize="lg">
              Om siden
            </Text>
          </Link>
        </NextLink>
        <Text fontSize="lg">
          Data fra{" "}
          <Link target="_blank" href="https://nsd.no/">
            <Text as="u">NSD</Text>
          </Link>
        </Text>
      </Box>
    </Box>
  );
}
