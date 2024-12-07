import Link from "next/link";
import {
  getDailyWeather,
  getWeeklySummary,
  DailyWeatherData,
  WeeklySummaryData,
} from "../api/weather";
import { useState, useEffect } from "react";
import formatDate from "../components/formatDate";
import PaletteChanger from "../components/PaletteChanger";

//MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
  Card,
} from "@mui/material";

import Map from "../components/Map";
import WeatherIcon from "../components/weatherIcon";
export default function Home() {
  const [dailyWeather, setDailyWeather] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState(50);
  const [longitude, setLongitude] = useState(19);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        // Fetch daily weather data
        const dailyData = await getDailyWeather(latitude, longitude);
        setDailyWeather(dailyData);

        // Fetch weekly weather summary
        const weeklyData = await getWeeklySummary(latitude, longitude);
        setWeeklySummary(weeklyData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude]);

  return (
    <>
      <PaletteChanger />

      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Tygodniowa Prognoza Pogody
        </Typography>

        <Box sx={{ height: 500, padding: 4 }}>
          <Map
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </Box>

        <TableContainer sx={{ marginTop: 8 }} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Ikona Pogody</TableCell>
                <TableCell>Temperatura Min (°C)</TableCell>
                <TableCell>Temperatura Max (°C)</TableCell>
                <TableCell>Wygenerowana energia (kWh)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dailyWeather.map((day, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(day.date)}</TableCell>
                  <TableCell>
                    <WeatherIcon weatherCode={day.weatherCode} />
                  </TableCell>
                  <TableCell>{day.minTemp}°C</TableCell>
                  <TableCell>{day.maxTemp}°C</TableCell>
                  <TableCell>{day.generatedEnergy} kWh</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {weeklySummary && (
          <Card sx={{ p: 2, marginTop: 2 }}>
            <Typography variant="h6">Podsumowanie</Typography>
            <Typography>
              Skrajne temperatury: {weeklySummary.extremeTemps.min}°C -{" "}
              {weeklySummary.extremeTemps.max}°C
            </Typography>
            <Typography>
              Średnie ciśnienie w ciągu najbliższego tygodnia:{" "}
              {weeklySummary.averagePressure} hPa
            </Typography>
            <Typography>
              Średni czas ekspozycji na słońce:{" "}
              {weeklySummary.averageSunExposure} godzin
            </Typography>
            <Typography sx={{ fontSize: 24 }}>
              {weeklySummary.summary}
            </Typography>
          </Card>
        )}
      </Box>
    </>
  );
}
