import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "fontsource-roboto";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Switch,
} from "@mui/material";

import "./options.css";
import {
  getStoredOptions,
  LocalStorageOptions,
  setStoredOptions,
} from "../utils/storage";

type FormState = "ready" | "saving";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<FormState>("ready");

  useEffect(() => {
    getStoredOptions().then((options) => setOptions(options));
  }, []);

  const handleHomeCityChange = (homeCity: string) => {
    setOptions({
      ...options,
      homeCity,
    });
  };

  const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
    setOptions({
      ...options,
      hasAutoOverlay,
    });
  };

  const handleSaveButtonClick = () => {
    setFormState("saving");
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState("ready");
      }, 500);
    });
  };

  const isFieldDisabled = formState === "saving";

  if (!options) {
    return null;
  }

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction={"column"} spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home city name</Typography>
              <TextField
                placeholder="Enter a home city"
                label="Enter a home city"
                fullWidth
                value={options.homeCity}
                onChange={(event) => {
                  handleHomeCityChange(event.target.value);
                }}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on web page load
              </Typography>
              <Switch
                color={"primary"}
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => {
                  handleAutoOverlayChange(checked);
                }}
                disabled={isFieldDisabled}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveButtonClick}
                disabled={isFieldDisabled}
              >
                {formState === "ready" ? "Save" : "Saving..."}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
