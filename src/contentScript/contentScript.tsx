import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "fontsource-roboto";
import "./contentScript.css";
import WeatherCard from "../components/WeatherCard";
import { Card } from "@mui/material";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";
import { Messages } from "../utils/messages";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
      setIsActive(options.hasAutoOverlay);
    });
  }, []);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg === Messages.TOGGLE_OVERLAY) {
        setIsActive(!isActive);
      }
    });
  }, [isActive]);

  if (!options) {
    return null;
  }

  return (
    <>
      {isActive && (
        <Card className="overlay-card">
          <WeatherCard
            city={options?.homeCity}
            tempScale={options?.tempScale}
            onDelete={() => setIsActive(false)}
          />
        </Card>
      )}
    </>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
