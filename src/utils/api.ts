// OpenWeatherApi key
const OPEN_WEATHER_API_KEY = "";

export type OpenWeatherTempScale = "metric" | "imperial";
export interface OpenWeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<any> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("City not found");
  }

  const data = res.json();
  return data;
}

export function getWeatherIconSrc(iconCode: string) {
  return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
}
