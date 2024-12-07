import apiClient from "./axios";

export interface DailyWeatherData {
  date: string;
  weatherCode: number;
  minTemp: number;
  maxTemp: number;
  energyGenerated: string;
}

export interface WeeklySummaryData {
  avgSunExposure: string;
  extremeTemps: {
    min: number;
    max: number;
  };
  summary: string;
}

export const getDailyWeather = async (
  latitude: number,
  longitude: number
): Promise<DailyWeatherData[]> => {
  try {
    const response = await apiClient.get("/weather/daily", {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching daily weather data:", error);
    throw error;
  }
};

export const getWeeklySummary = async (
  latitude: number,
  longitude: number
): Promise<WeeklySummaryData> => {
  try {
    const response = await apiClient.get("/weather/weekly-summary", {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly summary:", error);
    throw error;
  }
};
