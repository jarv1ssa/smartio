import AddDevice from "../../components/Private/AddDevice";
import {
  Button,
  GridItem,
  IconButton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { useDevice } from "../../hooks/useDevice";

const Header = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();
  const { device } = useDevice();

  return (
    <GridItem
      as="header"
      gridArea="header"
      display="grid"
      gridGap={4}
      p={{ base: 4, lg: 8 }}
    >
      <Stack direction="row" align="center" spacing={3}>
        <IconButton
          size="lg"
          aria-label="Toggle menu"
          icon={<HiMenu />}
          display={{ base: "flex", xl: "none" }}
          justifySelf="flex-start"
          _focus={{}}
          onClick={toggleMenu}
        />

        <Text
          display={{ xl: "none" }}
          my={2}
          fontSize={{ base: "xl", xl: "4xl" }}
          fontWeight="bold"
          textAlign="center"
        >
          {user?.displayName + "'s home"}
        </Text>
      </Stack>

      <Text
        display={{ base: "none", xl: "block" }}
        my={2}
        fontSize="4xl"
        fontWeight="bold"
        textAlign="center"
      >
        {user?.displayName + "'s home"}
      </Text>

      {!device && (
        <Button
          variant="smart"
          leftIcon={<FaPlus />}
          justifySelf="center"
          onClick={onOpen}
        >
          Connect device
        </Button>
      )}

      <AddDevice isOpen={isOpen} onClose={onClose} />
    </GridItem>
  );
};

export default Header;
