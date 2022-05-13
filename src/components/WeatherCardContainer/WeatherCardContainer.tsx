import React from "react";
import {
  Card,
  CardContent,
  Button,
  Box,
  CardActions,
  Typography,
} from "@mui/material";
import "../WeatherCard/WeatherCard.css";

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        {onDelete && (
          <CardActions>
            <Button onClick={onDelete} color="secondary">
              <Typography className="weather-card-body">Delete</Typography>
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default WeatherCardContainer;
