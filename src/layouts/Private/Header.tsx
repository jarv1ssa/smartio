import { Button, GridItem, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();

  return (
    <GridItem as="header" gridArea="header" px={4} py={10}>
      <Text mb={2} fontSize="4xl">{user?.displayName + "'s home"}</Text>

      <Button variant="smart" leftIcon={<FaPlus />}>
        Add device
      </Button>
    </GridItem>
  );
};

export default Header;
