import http from "../utils/http.util";

const baseURL = "https://api.weatherapi.com/v1";

export const getCurrentWeather = async (position: string) => {
  try {
    const res = await http({
      baseURL,
      params: { key: process.env.REACT_APP_WEATHER_API_KEY },
    }).get("current.json", {
      params: {
        q: position,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getWeatherForNDays = async (position: string, n: number) => {
  try {
    const res = await http({
      baseURL,
      params: { key: process.env.REACT_APP_WEATHER_API_KEY },
    }).get("forecast.json", {
      params: {
        q: position,
        days: n,
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};
