import Loading from "../../components/ui/Loading";
import { FiSunrise, FiSunset } from "react-icons/fi";
import {
  Flex,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { getWeatherForNDays } from "../../services/weather.service";
import { useEffect, useState } from "react";

const Aside = () => {
  const [current, setCurrent] = useState<any>();
  const [forecast, setForecast] = useState<any>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const res = await getWeatherForNDays(latitude + "," + longitude, 3);

      setCurrent(res.current);
      setForecast(res.forecast);
    });
  }, []);

  return current && forecast ? (
    <GridItem as="aside" gridArea="aside" px={10} py={16}>
      <Text mb={8} fontSize="4xl" textAlign="center">
        {current.condition.text}
      </Text>

      <Flex
        direction={{ base: "column", "2xl": "row" }}
        justify={{ "2xl": "space-between" }}
        align={{ "2xl": "center" }}
        gridGap={{ base: 2, "2xl": 0 }}
        mb={8}
      >
        <Stack direction="row" spacing={4}>
          <Image
            boxSize={16}
            src={forecast.forecastday[0].day.condition.icon}
          />

          <Stack spacing={0} justify="center">
            <Text color="gray.400">Today</Text>

            <Text fontSize="lg">
              {forecast.forecastday[0].day.condition.text}
            </Text>
          </Stack>
        </Stack>

        <Text fontSize="xl">
          {forecast.forecastday[0].day.maxtemp_c +
            "° / " +
            forecast.forecastday[0].day.mintemp_c +
            "°"}
        </Text>
      </Flex>

      <Flex
        direction={{ base: "column", "2xl": "row" }}
        justify={{ "2xl": "space-between" }}
        align={{ "2xl": "center" }}
        mb={8}
      >
        <Stack direction="row" spacing={4}>
          <Image
            boxSize={16}
            src={forecast.forecastday[1].day.condition.icon}
          ></Image>

          <Stack spacing={0} justify="center">
            <Text color="gray.400">Tomorrow</Text>

            <Text fontSize="lg">
              {forecast.forecastday[1].day.condition.text}
            </Text>
          </Stack>
        </Stack>

        <Text fontSize="xl">
          {forecast.forecastday[1].day.maxtemp_c +
            "° / " +
            forecast.forecastday[1].day.mintemp_c +
            "°"}
        </Text>
      </Flex>

      <Flex
        direction={{ base: "column", "2xl": "row" }}
        justify={{ "2xl": "space-between" }}
        align={{ "2xl": "center" }}
        mb={16}
      >
        <Stack direction="row" spacing={4}>
          <Image
            boxSize={16}
            src={forecast.forecastday[2].day.condition.icon}
          ></Image>

          <Stack spacing={0} justify="center">
            <Text color="gray.400">
              {new Date(forecast.forecastday[2].date).toLocaleDateString(
                "en-US",
                { weekday: "long" }
              )}
            </Text>

            <Text fontSize="lg">
              {forecast.forecastday[2].day.condition.text}
            </Text>
          </Stack>
        </Stack>

        <Text fontSize="xl">
          {forecast.forecastday[2].day.maxtemp_c +
            "° / " +
            forecast.forecastday[2].day.mintemp_c +
            "°"}
        </Text>
      </Flex>

      <SimpleGrid columns={2} mb={8}>
        <Stack>
          <Stack direction="row" align="center">
            <Icon as={FiSunrise} boxSize={5} color="yellow.500" />

            <Text fontSize="lg">Sunrise</Text>
          </Stack>

          <Text color="gray.400">{forecast.forecastday[0].astro.sunrise}</Text>
        </Stack>

        <Stack>
          <Stack direction="row" align="center">
            <Icon as={FiSunset} boxSize={5} color="yellow.500" />

            <Text fontSize="lg">Sunset</Text>
          </Stack>

          <Text color="gray.400">{forecast.forecastday[0].astro.sunset}</Text>
        </Stack>
      </SimpleGrid>

      <SimpleGrid columns={2} spacingY={5}>
        <Stack spacing={0}>
          <Text fontSize="xl">{current.temp_c + "°C"}</Text>
          <Text color="gray.400">Temperature</Text>
        </Stack>

        <Stack spacing={0}>
          <Text fontSize="xl">{current.feelslike_c + "°C"}</Text>
          <Text color="gray.400">Feels like</Text>
        </Stack>

        <Stack spacing={0}>
          <Text fontSize="xl">{current.humidity + "%"}</Text>
          <Text color="gray.400">Humidity</Text>
        </Stack>

        <Stack spacing={0}>
          <Text fontSize="xl">{current.wind_kph + " km/h"}</Text>
          <Text color="gray.400">Wind</Text>
        </Stack>
      </SimpleGrid>
    </GridItem>
  ) : (
    <GridItem gridArea="aside">
      <Loading />
    </GridItem>
  );
};

export default Aside;
