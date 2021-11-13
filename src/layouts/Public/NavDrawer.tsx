import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { publicLinks } from "../../common/links";

const NavDrawer = (props: Omit<DrawerProps, "children">) => {
  return (
    <Drawer size="full" {...props}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton _focus={{}} />

        <DrawerBody display="grid" placeItems="center" p={0}>
          <Box as="nav" w="full">
            <UnorderedList listStyleType="none" m={0}>
              {publicLinks.map((link) => (
                <ListItem key={link.key}>
                  <Button
                    as={NavLink}
                    to={link.to}
                    variant="ghost"
                    size="lg"
                    isFullWidth
                    my={2}
                    px={10}
                    borderRadius={0}
                    fontWeight="bold"
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
