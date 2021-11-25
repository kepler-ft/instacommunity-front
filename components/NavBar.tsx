import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Spacer,
  Input,
  Text,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { SearchIcon } from "@chakra-ui/icons";

interface NavBarProps {
  profile: Boolean;
  home: Boolean;
  searchFunction?: Function;
}

export default function NavBar({
  profile = false,
  home = false,
  searchFunction = undefined,
}: NavBarProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (searchFunction) {
      searchFunction(searchTerm);
    } else {
      router.push({
        pathname: `/communities/search`,
        query: {
          searchTerm: searchTerm,
        },
      });
    }
  };

  return (
    <Box>
      <Flex p="1%" justifyContent="center">
        <Flex flex="1" justifyContent="start" ml="auto">
          <Text fontSize="xl" align="center" as="b" mr="5%">
            InstaCommunity
          </Text>
          {profile && (
            <Button colorScheme="orange" onClick={() => router.push("/user/1")}>
              Perfil
            </Button>
          )}
          {home && (
            <Button colorScheme="orange" onClick={() => router.push("/")}>
              Home
            </Button>
          )}
        </Flex>
        <Center flex="5" justifyContent="center" alignSelf="center">
          <form
            style={{ width: "50%", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <InputGroup width="100%" size="md">
              <Input
                placeholder="Buscar comunidade"
                size="md"
                value={searchTerm}
                onChange={handleChange}
                borderRadius="md"
                border="1px"
              />
              <InputRightElement
                children={
                  <Button type="submit" size="md">
                    <SearchIcon />
                  </Button>
                }
              />
            </InputGroup>
          </form>
        </Center>
        <Flex flex="1" justifyContent="end" mr="auto">
          <Button
            colorScheme="orange"
            onClick={() => router.push("/communities/create")}
            pl="1%"
            pr="1%"
          >
            Criar comunidade
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
