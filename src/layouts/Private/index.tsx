import { Fragment, PropsWithChildren } from "react";
import Header from "./Header";
import NavDrawer from "./NavDrawer";

const Private = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Fragment>
      <Header />
      <NavDrawer />

      <div>{children}</div>
    </Fragment>
  );
};

export default Private;
