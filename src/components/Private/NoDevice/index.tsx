import nodevice from "../../../assets/images/nodevice.svg";
import { Center, Image } from "@chakra-ui/react";

const NoDevice = () => {
  return (
    <Center>
      <Image src={nodevice} boxSize="30%" my={20} />
    </Center>
  );
};

export default NoDevice;
