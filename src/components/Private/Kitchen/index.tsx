import kitchen from "../../../assets/images/kitchen.jpg";
import { BiDish } from "react-icons/bi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import {
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { MdAir, MdLight, MdOutlineCameraIndoor } from "react-icons/md";
import { useAuth } from "../../../hooks/useAuth";
import { useDocument } from "../../../hooks/useDocument";
import { useFirestore } from "../../../hooks/useFirestore";

const units = [
  { key: "ap", name: "Air purifier", icon: MdAir },
  { key: "dishwasher", name: "Dishwasher", icon: BiDish },
  { key: "light", name: "Light", icon: MdLight },
  { key: "refrigerator", name: "Refrigerator", icon: CgSmartHomeRefrigerator },
];

const Kitchen = () => {
  const { user } = useAuth();

  const { data } = useDocument("users", user!.uid);
  const { update } = useFirestore("users");

  return (
    <Stack spacing={5} p={4}>
      <Flex justify="space-between" align="center">
        <Stack direction="row" align="center">
          <Icon as={MdOutlineCameraIndoor} boxSize={8} />

          <Text fontSize="lg">Kitchen camera</Text>
        </Stack>

        <Switch
          colorScheme="smart"
          size="lg"
          isChecked={!!data?.units.kitchen.camera}
          onChange={(event) => {
            update(user!.uid, {
              "units.kitchen.camera": event.currentTarget.checked ? 1 : 0,
            });
          }}
        />
      </Flex>

      {data?.units.kitchen.camera && (
        <Image
          src={kitchen}
          maxH="600px"
          borderRadius="3xl"
          objectFit="cover"
        />
      )}

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
                  {data?.units.kitchen[unit.key]
                    ? "Connected"
                    : "Not connected"}
                </Text>
              </Stack>
            </Stack>

            <Switch
              colorScheme="smart"
              size="lg"
              isChecked={!!data?.units.kitchen[unit.key]}
              onChange={(event) => {
                const document: any = {};
                document[`units.kitchen.${unit.key}`] = event.currentTarget
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

export default Kitchen;
