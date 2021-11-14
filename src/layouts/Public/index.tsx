import Header from "./Header";
import NavDrawer from "./NavDrawer";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Fragment, PropsWithChildren } from "react";

const Public = ({ children }: PropsWithChildren<{}>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      <Header toggleMenu={onOpen} />

      <NavDrawer isOpen={isOpen} onClose={onClose} />

      <Box as="main">{children}</Box>
    </Fragment>
  );
};

export default Public;
