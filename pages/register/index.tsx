import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Input, HStack, Center } from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";

const Register: NextPage = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 200)
      return alert("Invalid Name");

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({ name: trimmedName }),
    });
  };

  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <Button
        rightIcon={<TriangleUpIcon />}
        colorScheme="blue"
        onClick={() => router.push(`/home`)}
      >
        Home
      </Button>
      <form onSubmit={handleSubmit}>
        <Center h="100px">
          <HStack spacing="24px">
            <Input
              placeholder="Fausto Silva"
              width="300px"
              size="sm"
              value={name}
              onChange={handleChange}
            />
            <Button colorScheme="blue" type="submit">
              Cadastrar
            </Button>
          </HStack>
        </Center>
      </form>
    </div>
  );
};

export default Register;
