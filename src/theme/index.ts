import "@fontsource/dm-sans";
import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "DM Sans",
    body: "DM Sans",
  },
  components: {
    Button: {
      variants: {
        smart: {
          bgColor: "pink.500",
          color: "white",
          _hover: {
            bgColor: "pink.600",
          },
          _focus: {
            bgColor: "pink.600",
            boxShadow: "none",
          },
          _active: {
            bgColor: "pink.600",
          },
        },
      },
    },
  },
});

export default theme;
