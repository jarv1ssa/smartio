import Public from "../../layouts/Public";
import about from "../../assets/images/about.svg";
import { Center, Heading, Image, Stack, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Public>
      <Center
        flexDirection={{ base: "column", lg: "row" }}
        gridGap={{ base: 16, lg: 20 }}
        px={10}
        py={{ base: 10, lg: 20 }}
      >
        <Image
          src={about}
          boxSize={{ base: "90%", sm: "70%", md: "50%", lg: "40%" }}
        />

        <Stack
          spacing={10}
          maxW={{ base: "md", xl: "xl" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Stack>
            <Heading>
              <Text as="span" color="pink.500">
                SmartIO{" "}
              </Text>
              developed by Emin Aliyev
            </Heading>

            <Text color="gray.400" fontSize="lg" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis, perspiciatis quo. Dolores, distinctio iure? Nulla
              ipsum quasi fuga nemo, recusandae enim est officiis, iusto nobis
              quod quam nisi minima assumenda? Necessitatibus eum totam libero
              porro dolorum ipsum reiciendis quis ad, illum, architecto nisi
              dicta nihil dolorem quos in nobis sapiente provident odio qui
              veniam labore voluptate! Mollitia aspernatur molestiae rerum.
            </Text>
          </Stack>
        </Stack>
      </Center>
    </Public>
  );
};

export default About;
