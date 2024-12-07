import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useColorScheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function PaletteChanger() {
  const { mode, setMode } = useColorScheme();

  const handleToggle = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "right",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <IconButton
        onClick={handleToggle}
        sx={{
          bgcolor: mode === "light" ? "warning.main" : "primary.main",
          color: "background.default",
          "&:hover": {
            bgcolor: mode === "light" ? "warning.dark" : "primary.dark",
          },
        }}
      >
        {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Box>
  );
}
