import logo from "../../assets/images/logo.png";
import { AiOutlineHome } from "react-icons/ai";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { publicLinks } from "../../common/links";

const Header = () => {
  return (
    <Flex as="header" justify="space-between" p={5}>
      <IconButton
        variant="ghost"
        size="lg"
        aria-label="Toggle menu"
        icon={<HiMenu />}
        display={{ base: "flex", lg: "none" }}
        _focus={{}}
      />

      <Stack direction="row" align="center">
        <Image src={logo} boxSize={8} />

        <Text fontWeight="bold">SmartIO</Text>
      </Stack>

      <Box as="nav" display={{ base: "none", lg: "flex" }}>
        <UnorderedList listStyleType="none" display="flex" gridGap={5}>
          {publicLinks.map((link) => (
            <ListItem>
              <Button
                as={NavLink}
                key={link.key}
                to={link.to}
                variant="ghost"
                px="10"
                _focus={{}}
                // @ts-ignore
                style={({ isActive }: { isActive: boolean }) => ({
                  backgroundColor: isActive
                    ? "var(--chakra-colors-pink-500)"
                    : "",
                })}
              >
                {link.title}
              </Button>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      <Button variant="smart" display={{ base: "none", lg: "flex" }} px={10}>
        Login
      </Button>

      <IconButton
        variant="ghost"
        size="lg"
        aria-label="Login"
        icon={<AiOutlineHome />}
        display={{ base: "flex", lg: "none" }}
      />
    </Flex>
  );
};

export default Header;
