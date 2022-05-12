import React from "react";
import { createRoot } from "react-dom/client";
import "fontsource-roboto";
import {
  Box,
  InputBase,
  IconButton,
  Paper,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  TextField,
} from "@mui/material";

import "./options.css";

const App: React.FC<{}> = () => {
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant="h4">Weather Extension Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Enter a home city</Typography>
              <TextField
                placeholder="Enter a home city"
                label="Enter a home city"
              />
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
