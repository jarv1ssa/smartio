import GooglePayButton from "@google-pay/button-react";
import Signup from "../Signup";
import hero from "../../../assets/images/hero.svg";
import {
  Button,
  Center,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <Center
      flexDirection={{ base: "column", lg: "row" }}
      gridGap={{ base: 16, lg: 20 }}
      px={10}
      py={{ base: 10, lg: 20 }}
    >
      <Stack
        spacing={10}
        maxW={{ base: "md", xl: "xl" }}
        textAlign={{ base: "center", lg: "left" }}
      >
        <Stack>
          <Heading>
            Controlling your{" "}
            <Text as="span" color="pink.500">
              HOME
            </Text>{" "}
            has never been this easy
          </Heading>

          <Text color="gray.400">
            Track your home's energy usage, temperature, and security with our
            state-of-the art smart devices.
          </Text>
        </Stack>

        {!user && (
          <GooglePayButton
            buttonColor="white"
            buttonSizeMode="fill"
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["VISA", "MASTERCARD"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "00000000-0000-0000-0000-000000000000",
                merchantName: "SmartIO",
              },
              transactionInfo: {
                totalPrice: "0",
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                currencyCode: "USD",
                countryCode: "US",
              },
              emailRequired: true,
            }}
            onLoadPaymentData={async ({ email }) => {
              setEmail(email || "");
              onOpen();
            }}
          />
        )}

        {user && (
          <Button variant="smart" onClick={() => navigate("/dashboard ")}>
            Go Home
          </Button>
        )}
      </Stack>

      <Image
        src={hero}
        boxSize={{ base: "90%", sm: "70%", md: "50%", lg: "40%" }}
      />

      <Signup email={email} modalProps={{ isOpen, onClose }} />
    </Center>
  );
};

export default Hero;
