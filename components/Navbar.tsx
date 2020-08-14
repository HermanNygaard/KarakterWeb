import React from "react";
import {
  Flex,
  Text,
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  MenuItemOption,
  MenuOptionGroup,
  Link,
} from "@chakra-ui/core";
import NextLink from "next/link";

function MobileMenu({ isOpen, onClose, btnRef, ...props }: any) {
  return (
    <Box {...props}>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>
          <Link>
            <NextLink href="/om">
              <Text>Om siden</Text>
            </NextLink>
          </Link>
          <DrawerBody>
            <Text>Hi</Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const insts = ["UiO", "NTNU", "UiB", "OsloMet", "BI"];

export default function Navbar({ currentUni, uniChange }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <nav>
      <Flex
        justifyContent={["space-between", "space-around"]}
        mx={2}
        mb={5}
        py="3"
      >
        <NextLink href="/">
          <Text ml={3} fontSize="xl" fontWeight="bold" color="#6390FF">
            Karakterweb
          </Text>
        </NextLink>
        <MobileMenu finalFocusRef={btnRef} isOpen={isOpen} onClose={onClose} />
        <Box d="flex">
          <NextLink href={`${currentUni ? "/om" : "/"}`}>
            <Link>
              <Text color="#3f3f54" fontSize="md" mr={5} mt={1}>{`${
                currentUni ? "Om" : "Hjem"
              }`}</Text>
            </Link>
          </NextLink>
          {currentUni && (
            <Menu>
              <MenuButton
                as={Button}
                w={100}
                rounded={100}
                px={4}
                size="sm"
                style={{ backgroundColor: "white" }}
                borderColor="#6390FF"
                border="2px solid "
                color="#6390FF"
              >
                {currentUni}
              </MenuButton>
              <MenuList>
                <MenuOptionGroup onChange={uniChange} defaultValue={currentUni}>
                  {insts.map((inst) => (
                    <MenuItemOption
                      _active={{ bg: "#fff" }}
                      _selected={{ bg: "#fff" }}
                      bg={inst == currentUni ? "#6390FF" : ""}
                      value={inst}
                    >
                      {inst}
                    </MenuItemOption>
                  ))}
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          )}
        </Box>
      </Flex>
    </nav>
  );
}
