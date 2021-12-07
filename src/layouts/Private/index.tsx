import Aside from "./Aside";
import Header from "./Header";
import Loading from "../../components/ui/Loading";
import NavDrawer from "./NavDrawer";
import NoDevice from "../../components/Private/NoDevice";
import Sidebar from "./Sidebar";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDevice } from "../../hooks/useDevice";
import { useNavigate } from "react-router";

const Private = ({ children }: PropsWithChildren<{}>) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, loading } = useAuth();
  const { device } = useDevice();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  return user ? (
    <Grid
      templateRows="auto 4fr"
      templateColumns="auto 3fr 1fr"
      templateAreas={{
        base: "'header header header' 'main main main' 'aside aside aside'",
        xl: "'sidebar header aside' 'sidebar main aside'",
      }}
      gap={{ xl: 4 }}
    >
      <Sidebar />

      <Header toggleMenu={onOpen} />

      <NavDrawer isOpen={isOpen} onClose={onClose} />

      <GridItem as="main" gridArea="main">
        {device && children}
        {!device && <NoDevice />}
      </GridItem>

      <Aside />
    </Grid>
  ) : (
    <Loading />
  );
};

export default Private;
