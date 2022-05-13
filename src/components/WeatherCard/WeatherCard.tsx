import React, { useEffect, useState } from "react";
import "./WeatherCard.css";
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from "../../utils/api";
import { Typography } from "@mui/material";
import WeatherCardContainer from "../WeatherCardContainer";

type WeatherCardState = "loading" | "error" | "ready";

const WeatherCard: React.FC<{
  city: string;
  tempScale: OpenWeatherTempScale;
  onDelete?: () => void;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>("loading");

  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState("ready");
      })
      .catch((err) => setCardState("error"));
  }, [city, tempScale]);

  if (cardState === "loading" || cardState === "error" || !weatherData) {
    return (
      <WeatherCardContainer>
        <Typography className="weather-card-title">{city}</Typography>
        <Typography className="weather-card-body">
          {cardState === "loading"
            ? "Loading..."
            : "Error: Could not retrieve weather data for this city"}
        </Typography>
      </WeatherCardContainer>
    );
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography className="weather-card-title">{weatherData.name}</Typography>
      <Typography className="weather-card-body">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography className="weather-card-body">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;
