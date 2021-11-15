import GooglePayButton from "@google-pay/button-react";
import hero from "../../../assets/images/hero.svg";
import { Center, Heading, Image, Stack, Text } from "@chakra-ui/react";

const Hero = () => {
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
            console.log(email);
          }}
        />
      </Stack>

      <Image
        boxSize={{ base: "90%", sm: "70%", md: "50%", lg: "40%" }}
        src={hero}
      />
    </Center>
  );
};

export default Hero;
