import Aside from "./Aside";
import Header from "./Header";
import NavDrawer from "./NavDrawer";
import Sidebar from "./Sidebar";
import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

const Private = ({ children }: PropsWithChildren<{}>) => {
  const { isOpen, onClose } = useDisclosure();

  return (
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
  );
};

export default Private;
