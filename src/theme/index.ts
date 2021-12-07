import "@fontsource/dm-sans";
import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    smart: {
      100: "#d53f8c",
      200: "#d53f8c",
      300: "#d53f8c",
      400: "#d53f8c",
      500: "#d53f8c",
      600: "#d53f8c",
      700: "#d53f8c",
      800: "#d53f8c",
      900: "#d53f8c",
    },
  },
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
