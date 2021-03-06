import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import theme from "./theme";
import { AuthContextProvider } from "./store/auth-context";
import { ChakraProvider } from "@chakra-ui/react";
import { DeviceContextProvider } from "./store/device-context";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <DeviceContextProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/settings" element={<Settings />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </ChakraProvider>
      </DeviceContextProvider>
    </AuthContextProvider>
  );
}

export default App;
