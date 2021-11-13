import Header from "./Header";
import NavDrawer from "./NavDrawer";
import { Fragment, PropsWithChildren } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";

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
