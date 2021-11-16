import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import theme from "./theme";
import { AuthContextProvider } from "./store/auth-context";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Devices from "./pages/Devices";
import Settings from "./pages/Settings";

function App() {
  return (
    <AuthContextProvider>
      <ChakraProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />}></Route>

          <Route path="/about" element={<About />}></Route>

          <Route path="/dashboard" element={<Dashboard />}></Route>

          <Route path="/devices" element={<Devices />}></Route>

          <Route path="/settings" element={<Settings />}></Route>
        </Routes>
      </ChakraProvider>
    </AuthContextProvider>
  );
}

export default App;
