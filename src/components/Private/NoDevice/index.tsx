import nodevices from "../../../assets/images/nodevices.svg";
import { Center, Image } from "@chakra-ui/react";

const NoDevice = () => {
  return (
    <Center>
      <Image src={nodevices} boxSize="30%" my={20} />
    </Center>
  );
};

export default NoDevice;
