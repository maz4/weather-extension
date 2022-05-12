import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import "fontsource-roboto";
import AddIcon from "@mui/icons-material/Add";
import { Box, InputBase, IconButton, Paper, Grid } from "@mui/material";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from "../utils/storage";

const celsius = "\u2103";
const fahrenheit = "\u2109";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return;
    }

    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteButtonClick = (index: number) => {
    const citiesCopy = [...cities];
    citiesCopy.splice(index, 1);
    setCities([...citiesCopy]);
  };

  const handelTempScaleButtonClick = () => {
    const updateOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    };
    setStoredOptions(options).then(() => {
      setOptions(updateOptions);
    });
  };

  if (!options) {
    return null;
  }

  return (
    <Box mx={"8px"} my={"16px"}>
      <Grid container justifyContent={"space-evenly"}>
        <Grid item>
          <Paper>
            <Box px={"16px"} py={"5px"}>
              <InputBase
                placeholder="Add a city name"
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
        <Grid item>
          <Box>
            <Paper>
              <IconButton onClick={handelTempScaleButtonClick}>
                {options.tempScale === "metric" ? celsius : fahrenheit}
              </IconButton>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      {options.homeCity !== "" && (
        <WeatherCard city={options.homeCity} tempScale={options.tempScale} />
      )}

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          tempScale={options.tempScale}
          key={city + index}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height={"16px"}></Box>
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
