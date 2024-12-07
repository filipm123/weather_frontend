import React from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import GrainIcon from "@mui/icons-material/Grain";

// Map weather codes to Material-UI icons
export const weatherCodeToIcon = {
  0: WbSunnyIcon,
  1: WbSunnyIcon,
  2: WbSunnyIcon,
  3: WbSunnyIcon,
  45: CloudIcon,
  48: CloudIcon,
  51: WaterDropIcon,
  53: WaterDropIcon,
  55: WaterDropIcon,
  56: WaterDropIcon,
  57: WaterDropIcon,
  61: WaterDropIcon,
  63: WaterDropIcon,
  65: WaterDropIcon,
  66: WaterDropIcon,
  67: WaterDropIcon,
  71: AcUnitIcon,
  73: AcUnitIcon,
  75: AcUnitIcon,
  77: AcUnitIcon,
  80: WaterDropIcon,
  81: WaterDropIcon,
  82: WaterDropIcon,
  85: AcUnitIcon,
  86: AcUnitIcon,
  95: ThunderstormIcon,
  96: GrainIcon,
  99: GrainIcon,
};

function WeatherIcon({ weatherCode }) {
  const IconComponent = weatherCodeToIcon[weatherCode];

  return (
    <div>
      {IconComponent ? (
        <IconComponent style={{ fontSize: 32 }} />
      ) : (
        <p>No icon available for this weather code.</p>
      )}
    </div>
  );
}

export default WeatherIcon;
