import Aside from "./Aside";
import Header from "./Header";
import Loading from "../../components/ui/Loading";
import NavDrawer from "./NavDrawer";
import Sidebar from "./Sidebar";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Private = ({ children }: PropsWithChildren<{}>) => {
  const { isOpen, onClose } = useDisclosure();
  const { user, loading } = useAuth();
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
        lg: "'sidebar header aside' 'sidebar main aside'",
      }}
    >
      <Sidebar />

      <Header />

      <NavDrawer isOpen={isOpen} onClose={onClose} />

      <GridItem as="main" gridArea="main" bgColor="red.500">
        {children}
      </GridItem>

      <Aside />
    </Grid>
  ) : (
    <Loading />
  );
};

export default Private;
