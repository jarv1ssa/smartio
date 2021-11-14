import {
  GridItem,
  Icon,
  IconButton,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { privateLinks } from "../../common/links";

const Sidebar = () => {
  return (
    <GridItem
      as="nav"
      gridArea="sidebar"
      minH="100vh"
      display={{ base: "none", lg: "flex" }}
      alignItems="center"
      px={2}
    >
      <UnorderedList listStyleType="none" m={0}>
        {privateLinks.map((link) => (
          <ListItem key={link.key}>
            <IconButton
              as={NavLink}
              to={link.to}
              variant="ghost"
              size="lg"
              icon={<Icon as={link.icon} />}
              my={2}
              px={4}
              _focus={{}}
              // @ts-ignore
              style={({ isActive }: { isActive: boolean }) => ({
                backgroundColor: isActive
                  ? "var(--chakra-colors-pink-500)"
                  : "",
              })}
            />
          </ListItem>
        ))}
      </UnorderedList>
    </GridItem>
  );
};

export default Sidebar;
