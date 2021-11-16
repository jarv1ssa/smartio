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
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { publicLinks } from "../../common/links";
import Login from "../../components/Public/Login";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Header = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Flex as="header" justify="space-between" p={5}>
      <IconButton
        variant="ghost"
        size="lg"
        aria-label="Toggle menu"
        icon={<HiMenu />}
        display={{ base: "flex", lg: "none" }}
        _focus={{}}
        onClick={toggleMenu}
      />

      <Stack direction="row" align="center">
        <Image src={logo} boxSize={8} />

        <Text fontSize="lg" fontWeight="bold">SmartIO</Text>
      </Stack>

      <Box as="nav" display={{ base: "none", lg: "flex" }}>
        <UnorderedList listStyleType="none" display="flex" gridGap={5} m={0}>
          {publicLinks.map((link) => (
            <ListItem key={link.key}>
              <Button
                as={NavLink}
                to={link.to}
                variant="ghost"
                px={10}
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

      {!user && (
        <Button
          variant="smart"
          display={{ base: "none", lg: "flex" }}
          px={10}
          onClick={onOpen}
        >
          Login
        </Button>
      )}

      {user && (
        <IconButton
          variant="ghost"
          size="lg"
          aria-label={user ? "Go home" : "Login"}
          icon={<AiOutlineHome />}
          _focus={{}}
          onClick={user ? () => navigate("/dashboard") : onOpen}
        />
      )}

      <Login isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
