import "leaflet/dist/leaflet.css";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

const markerIcon = L.icon({
  iconUrl: "location-dot-solid.svg",
  iconSize: [32, 32],
  iconAnchor: [0, 0],
  popupAnchor: [0, 0],
});
export default function Map({ setLatitude, setLongitude }) {
  const [latitude, setLocalLatitude] = useState(40.73061); // Default latitude (New York City)
  const [longitude, setLocalLongitude] = useState(-73.935242); // Default longitude (New York City)

  // Request user's location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocalLatitude(latitude);
          setLocalLongitude(longitude);
          setLatitude(latitude); // Update parent state
          setLongitude(longitude); // Update parent state
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location if location access is denied
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [setLatitude, setLongitude]);

  // Component to update the map's center whenever latitude or longitude changes
  const CenterMapOnMarker = () => {
    const map = useMap();
    useEffect(() => {
      map.flyTo([latitude, longitude], map.getZoom());
    }, [latitude, longitude, map]);
    return null; // No visible component rendered
  };

  const LocationPicker = () => {
    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setLocalLatitude(lat);
        setLocalLongitude(lng);
        setLatitude(lat); // Update parent state
        setLongitude(lng); // Update parent state
      },
    });
    return <Marker  icon={markerIcon} position={[latitude, longitude]} />;
  };

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={8}
      style={{ height: "100%", width: "100%" }}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationPicker />
      <CenterMapOnMarker /> {/* Keeps the marker always in view */}
    </MapContainer>
  );
}
