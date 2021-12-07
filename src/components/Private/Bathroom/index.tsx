import { CgSmartHomeWashMachine } from "react-icons/cg";
import { Flex, Icon, SimpleGrid, Stack, Switch, Text } from "@chakra-ui/react";
import { MdAir, MdLight } from "react-icons/md";
import { useAuth } from "../../../hooks/useAuth";
import { useDocument } from "../../../hooks/useDocument";
import { useFirestore } from "../../../hooks/useFirestore";

const units = [
  { key: "ap", name: "Air purifier", icon: MdAir },
  { key: "light", name: "Light", icon: MdLight },
  {
    key: "washingmachine",
    name: "Washing machine",
    icon: CgSmartHomeWashMachine,
  },
];

const Bathroom = () => {
  const { user } = useAuth();

  const { data } = useDocument("users", user!.uid);
  const { update } = useFirestore("users");

  return (
    <Stack spacing={5} p={4}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
        {units.map((unit) => (
          <Flex
            key={unit.key}
            justify="space-between"
            align="center"
            p={5}
            borderRadius="3xl"
            bgColor="gray.600"
          >
            <Stack direction="row" align="center" spacing={3}>
              <Icon as={unit.icon} boxSize={8} />

              <Stack>
                <Text fontWeight="bold">{unit.name}</Text>
                <Text>
                  {data?.units.bathroom[unit.key]
                    ? "Connected"
                    : "Not connected"}
                </Text>
              </Stack>
            </Stack>

            <Switch
              colorScheme="smart"
              size="lg"
              isChecked={!!data?.units.bathroom[unit.key]}
              onChange={(event) => {
                const document: any = {};
                document[`units.bathroom.${unit.key}`] = event.currentTarget
                  .checked
                  ? 1
                  : 0;

                update(user!.uid, document);
              }}
            ></Switch>
          </Flex>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default Bathroom;
