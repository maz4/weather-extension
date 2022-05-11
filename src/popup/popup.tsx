import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import WeatherCard from "./WeatherCard";
import "fontsource-roboto";
import AddIcon from "@mui/icons-material/Add";
import { Box, InputBase, IconButton, Paper, Grid } from "@mui/material";

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>(["Leeds", "Toronto", "Error"]);
  const [cityInput, setCityInput] = useState<string>("");

  const handleCityButtonClick = () => {
    if (cityInput === "") {
      return;
    }

    setCities([...cities, cityInput]);
    setCityInput("");
  };

  const handleCityDeleteButtonClick = (index: number) => {
    const citiesCopy = [...cities];
    citiesCopy.splice(index, 1);
    setCities([...citiesCopy]);
  };

  return (
    <Box mx={"8px"} my={"16px"}>
      <Grid container>
        <Grid item>
          <Paper>
            <Box px={"15px"} py={"5px"}>
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
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          city={city}
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
