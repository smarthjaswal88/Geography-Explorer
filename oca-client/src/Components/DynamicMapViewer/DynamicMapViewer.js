import React, { useState, useRef } from "react";
import { VectorMap } from "@react-jvectormap/core";
import { Globe, MapPin, Eye } from "lucide-react";

import inMill from "@react-jvectormap/india/dist/inMill.json";
import usMill from "@react-jvectormap/unitedstates/dist/usMill.json";
import caMill from "@react-jvectormap/canada/dist/caMill.json";
import frMill from "@react-jvectormap/france/dist/frMill.json";
import deMill from "@react-jvectormap/germany/dist/deMill.json";
import brMill from "@react-jvectormap/brazil/dist/brMill.json";
import cnMill from "@react-jvectormap/china/dist/cnMill.json";
import auMill from "@react-jvectormap/australia/dist/auMill.json";
import ruMill from "@react-jvectormap/russia/dist/ruMill.json";
import worldMill from "@react-jvectormap/world/dist/worldMill.json";

const MAPS = {
  India: inMill,
  UnitedStates: usMill,
  Canada: caMill,
  France: frMill,
  Germany: deMill,
  Brazil: brMill,
  China: cnMill,
  Australia: auMill,
  Russia: ruMill,
  World: worldMill,
};

const DynamicMapViewer = () => {
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [mapKey, setMapKey] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const mapContainerRef = useRef(null);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setMapKey((prev) => prev + 1);
    setSelectedRegion(null);
  };

  const handleRegionClick = (event, code) => {
    setSelectedRegion(code);
    console.log(`Exploring region: ${code}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Globe className="text-blue-400" size={32} />
          <h1 className="text-3xl font-bold text-white">
            🌍 Geography Explorer
          </h1>
          <Globe className="text-green-400" size={32} />
        </div>
        <p className="text-gray-300 text-lg">
          Discover amazing places around the world!
        </p>
      </div>

      {/* Country Selection */}
      <div className="mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-white" size={24} />
            <label className="text-xl font-bold text-white">
              Choose Your Adventure:
            </label>
          </div>

          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full p-4 text-lg font-medium border-2 border-white/20 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
          >
            {Object.keys(MAPS).map((country) => (
              <option
                key={country}
                value={country}
                className="text-gray-800 py-2"
              >
                {country === "UnitedStates"
                  ? "🇺🇸 United States"
                  : country === "India"
                  ? "🇮🇳 India"
                  : country === "Canada"
                  ? "🇨🇦 Canada"
                  : country === "France"
                  ? "🇫🇷 France"
                  : country === "Germany"
                  ? "🇩🇪 Germany"
                  : country === "Brazil"
                  ? "🇧🇷 Brazil"
                  : country === "China"
                  ? "🇨🇳 China"
                  : country === "Australia"
                  ? "🇦🇺 Australia"
                  : country === "Russia"
                  ? "🇷🇺 Russia"
                  : country === "World"
                  ? "🌍 World"
                  : country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-2xl border-4 border-white/20">
        <div className="bg-white rounded-2xl shadow-inner overflow-hidden">
          <div ref={mapContainerRef} style={{ width: "100%", height: "500px" }}>
            <VectorMap
              key={`${selectedCountry}-${mapKey}`}
              map={MAPS[selectedCountry]}
              backgroundColor="#f0f9ff"
              containerStyle={{
                width: "100%",
                height: "100%",
              }}
              containerClassName="map-container"
              regionStyle={{
                initial: {
                  fill: "#3b82f6",
                  "fill-opacity": 0.8,
                  stroke: "#ffffff",
                  "stroke-width": 2,
                  "stroke-opacity": 1,
                },
                hover: {
                  fill: "#1d4ed8",
                  "fill-opacity": 1,
                  stroke: "#fbbf24",
                  "stroke-width": 3,
                },
                selected: {
                  fill: "#10b981",
                  "fill-opacity": 1,
                },
              }}
              markerStyle={{
                initial: {
                  fill: "#f59e0b",
                  stroke: "#ffffff",
                  "stroke-width": 2,
                  r: 6,
                },
                hover: {
                  fill: "#d97706",
                  stroke: "#ffffff",
                  "stroke-width": 3,
                  r: 8,
                },
              }}
              onRegionTipShow={(event, label, code) => {
                label.html(
                  `<div style="padding: 12px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; font-size: 14px; box-shadow: 0 8px 16px rgba(0,0,0,0.3); border: 2px solid rgba(255,255,255,0.2);">
                    <strong style="font-size: 16px;">🗺️ ${label.html()}</strong><br/>
                    <span style="opacity: 0.9;">Region Code: ${code}</span><br/>
                    <span style="font-size: 12px; opacity: 0.8;">Click to explore!</span>
                  </div>`
                );
              }}
              onRegionClick={handleRegionClick}
              onRegionOver={(event, code) => {
                console.log(`Discovering region: ${code}`);
              }}
              onRegionOut={(event, code) => {
                console.log(`Leaving region: ${code}`);
              }}
              zoomOnScroll={true}
              panOnDrag={true}
              zoomMax={8}
              zoomMin={1}
              zoomStep={1.5}
            />
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {/* Current Exploration */}
        <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="text-yellow-300" size={24} />
            <h3 className="text-xl font-bold">Current Exploration</h3>
          </div>
          <p className="text-lg mb-2">
            <strong>🌍 Exploring:</strong>{" "}
            {selectedCountry === "UnitedStates"
              ? "United States"
              : selectedCountry}
          </p>
          {selectedRegion && (
            <p className="text-lg">
              <strong>📍 Selected Region:</strong> {selectedRegion}
            </p>
          )}
        </div>

        {/* Fun Instructions */}
        <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-2xl p-6 text-white shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <Eye className="text-yellow-300" size={24} />
            <h3 className="text-xl font-bold">How to Explore</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-yellow-300">🖱️</span>
              <span>Click and drag to move around</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-300">🔍</span>
              <span>Scroll to zoom in and out</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-300">👆</span>
              <span>Hover over regions for info</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-yellow-300">✨</span>
              <span>Click regions to select them</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Fun Facts Section */}
      <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
        <h3 className="text-xl font-bold mb-3 text-center">🎉 Did You Know?</h3>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-2">🌍</div>
            <p className="text-sm">There are 195 countries in the world!</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-2">🏔️</div>
            <p className="text-sm">Mount Everest is the tallest mountain!</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
            <div className="text-2xl mb-2">🌊</div>
            <p className="text-sm">The Pacific Ocean is the largest ocean!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicMapViewer;
