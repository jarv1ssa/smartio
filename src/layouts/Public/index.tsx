import Header from "./Header";
import NavDrawer from "./NavDrawer";
import { Box, useDisclosure } from "@chakra-ui/react";
import { Fragment, PropsWithChildren } from "react";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/ui/Loading";

const Public = ({ children }: PropsWithChildren<{}>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading } = useAuth();

  return !loading ? (
    <Fragment>
      <Header toggleMenu={onOpen} />

      <NavDrawer isOpen={isOpen} onClose={onClose} />

      <Box as="main">{children}</Box>
    </Fragment>
  ) : (
    <Loading />
  );
};

export default Public;
