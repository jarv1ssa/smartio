import { Center } from "@chakra-ui/react";
import { ScalingSquaresSpinner } from "react-epic-spinners";

const Loading = () => {
  return (
    <Center minH="100vh">
      <ScalingSquaresSpinner color="#d53f8c" />
    </Center>
  );
};

export default Loading;
