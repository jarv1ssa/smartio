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
        <TabList>
          <Tab _focus={{}}>Living room</Tab>
          <Tab _focus={{}}>Bedroom</Tab>
          <Tab _focus={{}}>Bathroom</Tab>
          <Tab _focus={{}}>Kitchen</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Livingroom />
          </TabPanel>

          <TabPanel>
            <Bedroom />
          </TabPanel>

          <TabPanel>
            <Bathroom />
          </TabPanel>

          <TabPanel>
            <Kitchen />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Private>
  );
};

export default Dashboard;
