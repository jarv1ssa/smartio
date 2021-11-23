import AddDevice from "../../components/Private/AddDevice";
import {
  Button,
  GridItem,
  IconButton,
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
      placeItems={{ base: "center", xl: "flex-start" }}
      px={5}
      pt={5}
      pb={10}
    >
      <IconButton
        variant="ghost"
        size="lg"
        aria-label="Toggle menu"
        icon={<HiMenu />}
        display={{ base: "flex", xl: "none" }}
        justifySelf="flex-start"
        _focus={{}}
        onClick={toggleMenu}
      />

      <Text my={2} fontSize="4xl" textAlign="center">
        {user?.displayName + "'s home"}
      </Text>

      {!device && (
        <Button variant="smart" leftIcon={<FaPlus />} onClick={onOpen}>
          Connect device
        </Button>
      )}

      <AddDevice isOpen={isOpen} onClose={onClose} />
    </GridItem>
  );
};

export default Header;
