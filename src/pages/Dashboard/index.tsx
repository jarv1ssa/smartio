import Bathroom from "../../components/Private/Bathroom";
import Bedroom from "../../components/Private/Bedroom";
import Kitchen from "../../components/Private/Kitchen";
import Livingroom from "../../components/Private/Livingroom";
import Private from "../../layouts/Private";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";

const Dashboard = () => {
  return (
    <Private>
      <Tabs colorScheme="pink">
        <TabList mx={8} flexDirection={{ base: "column", sm: "row" }}>
          <Tab _focus={{}}>Living room</Tab>
          <Tab _focus={{}}>Bedroom</Tab>
          <Tab _focus={{}}>Bathroom</Tab>
          <Tab _focus={{}}>Kitchen</Tab>
        </TabList>

        <TabPanels p={{ base: 8, xl: 0 }} py={{ xl: 4 }}>
          <TabPanel mt={{ xl: 4 }} borderRadius="3xl" bgColor="gray.700">
            <Livingroom />
          </TabPanel>

          <TabPanel mt={{ xl: 4 }} borderRadius="3xl" bgColor="gray.700">
            <Bedroom />
          </TabPanel>

          <TabPanel mt={{ xl: 4 }} borderRadius="3xl" bgColor="gray.700">
            <Bathroom />
          </TabPanel>

          <TabPanel mt={{ xl: 4 }} borderRadius="3xl" bgColor="gray.700">
            <Kitchen />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Private>
  );
};

export default Dashboard;
