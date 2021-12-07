import livingroom from "../../../assets/images/livingroom.jpg";
import {
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import {
  MdAcUnit,
  MdAir,
  MdLight,
  MdOutlineCameraIndoor,
  MdTv,
} from "react-icons/md";
import { useAuth } from "../../../hooks/useAuth";
import { useDocument } from "../../../hooks/useDocument";
import { useFirestore } from "../../../hooks/useFirestore";

const units = [
  { key: "ac", name: "Air conditioner", icon: MdAcUnit },
  { key: "ap", name: "Air purifier", icon: MdAir },
  { key: "light", name: "Light", icon: MdLight },
  { key: "tv", name: "TV", icon: MdTv },
];

const Livingroom = () => {
  const { user } = useAuth();

  const { data } = useDocument("users", user!.uid);
  const { update } = useFirestore("users");

  return (
    <Stack spacing={5} p={4}>
      <Flex justify="space-between" align="center">
        <Stack direction="row" align="center">
          <Icon as={MdOutlineCameraIndoor} boxSize={8} />
          <Text fontSize="lg">Living room camera</Text>
        </Stack>

        <Switch
          colorScheme="smart"
          size="lg"
          isChecked={!!data?.units.livingroom.camera}
          onChange={(event) => {
            update(user!.uid, {
              "units.livingroom.camera": event.currentTarget.checked ? 1 : 0,
            });
          }}
        />
      </Flex>

      {data?.units.livingroom.camera && (
        <Image
          src={livingroom}
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
                  {data?.units.livingroom[unit.key]
                    ? "Connected"
                    : "Not connected"}
                </Text>
              </Stack>
            </Stack>

            <Switch
              colorScheme="smart"
              size="lg"
              isChecked={!!data?.units.livingroom[unit.key]}
              onChange={(event) => {
                const document: any = {};
                document[`units.livingroom.${unit.key}`] = event.currentTarget
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

export default Livingroom;
