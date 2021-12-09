import Account from "../../components/Private/Account";
import Private from "../../layouts/Private";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

const Settings = () => {
  return (
    <Private>
      <Tabs colorScheme="pink">
        <TabList flexDirection={{ base: "column", sm: "row" }} mx={8}>
          <Tab _focus={{}}>Account</Tab>
        </TabList>

        <TabPanels p={{ base: 8, xl: 0 }} py={{ xl: 4 }}>
          <TabPanel mt={{ xl: 4 }} p={8} borderRadius="3xl" bgColor="gray.700">
            <Account />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Private>
  );
};

export default Settings;
