"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

// Import images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// IMPORTANT: Replace with your actual OpenWeatherMap API key
const OPENWEATHERMAP_API_KEY = "YOUR_API_KEY_HERE";

const MapComponent = () => {
  const brusselsCoords = [23.764071365360167, 90.42561118736442];

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden border border-[#ffffff1a]">
      <MapContainer
        center={brusselsCoords}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-2xl"
      >
        <LayersControl position="topright">
          {/* Base Map Layer */}
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {/* OpenWeatherMap Overlays with opacity set */}
          <LayersControl.Overlay name="Clouds">
            <TileLayer
              attribution='© <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              opacity={0.5} // Key change: Added opacity
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Global Precipitation">
            <TileLayer
              attribution='© <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              opacity={0.6} // Key change: Added opacity
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Temperature">
            <TileLayer
              attribution='© <a href="https://openweathermap.org/">OpenWeatherMap</a>'
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_API_KEY}`}
              opacity={0.7} // Key change: Added opacity
            />
          </LayersControl.Overlay>
          
        </LayersControl>

        <Marker position={brusselsCoords}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lg mb-2">MiningToken Office</h3>
              <p className="text-sm">
                Avenue des Arts 56
                <br />
                1000 Brussels, Belgium
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapComponent;