import React, { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Comprehensive client data with multiple country identifiers
const clientsData = {
  // United States
  USA: 800,
  US: 800,
  "United States": 800,
  "United States of America": 800,
  // India
  IND: 600,
  IN: 600,
  India: 600,
  // Bangladesh
  BGD: 400,
  BD: 400,
  Bangladesh: 400,
  // Pakistan
  PAK: 300,
  PK: 300,
  Pakistan: 300,
  // France
  FRA: 1500,
  FR: 1500,
  France: 1500,
  // United Kingdom
  GBR: 1200,
  GB: 1200,
  "United Kingdom": 1200,
  UK: 1200,
  // Germany
  DEU: 900,
  DE: 900,
  Germany: 900,
  // Canada
  CAN: 700,
  CA: 700,
  Canada: 700,
  // Australia
  AUS: 500,
  AU: 500,
  Australia: 500,
  // Brazil
  BRA: 400,
  BR: 400,
  Brazil: 400,
  // Mexico
  MEX: 250,
  MX: 250,
  Mexico: 250,
  // Japan
  JPN: 800,
  JP: 800,
  Japan: 800,
  // China
  CHN: 1200,
  CN: 1200,
  China: 1200,
  // Russia
  RUS: 300,
  RU: 300,
  Russia: 300,
  "Russian Federation": 300,
  // Nigeria
  NGA: 280,
  NG: 280,
  Nigeria: 280,
  // Egypt
  EGY: 150,
  EG: 150,
  Egypt: 150,
  // South Africa
  ZAF: 120,
  ZA: 120,
  "South Africa": 120,
  // Kenya
  KEN: 100,
  KE: 100,
  Kenya: 100,
  // Morocco
  MAR: 80,
  MA: 80,
  Morocco: 80,
  // Tunisia
  TUN: 60,
  TN: 60,
  Tunisia: 60,
  // Western Sahara (for the specific case in the debug log)
  ESH: 25,
  "W. Sahara": 25,
  "Western Sahara": 25,
  // Additional countries
  ESP: 600,
  ES: 600,
  Spain: 600,
  ITA: 550,
  IT: 550,
  Italy: 550,
  NLD: 450,
  NL: 450,
  Netherlands: 450,
  SWE: 400,
  SE: 400,
  Sweden: 400,
  POL: 350,
  PL: 350,
  Poland: 350,
};

export default function WorldMap({ title = "World Map" }) {
  const [tooltipContent, setTooltipContent] = useState("");

  // Function to get color based on client count
  const getCountryColor = (clientCount) => {
    if (clientCount >= 1000) return "#16a34a"; // Green for high count
    if (clientCount >= 500) return "#22c55e"; // Medium green for medium-high count
    if (clientCount >= 200) return "#4ade80"; // Light green for medium count
    if (clientCount >= 100) return "#86efac"; // Very light green for low count
    if (clientCount > 0) return "#dcfce7"; // Very light green for any data
    return "#D6D6DA"; // Gray for no data
  };

  const legendData = [
    { label: "1000+ clients", count: "1000+", color: "#16a34a" },
    { label: "500-999 clients", count: "500-999", color: "#22c55e" },
    { label: "200-499 clients", count: "200-499", color: "#4ade80" },
    { label: "100-199 clients", count: "100-199", color: "#86efac" },
    { label: "No data", count: "No data", color: "#D6D6DA" },
  ];

  return (
    <div className="w-full mx-auto rounded-lg shadow-xl p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 mb-6">{title}</h1>

      {/* Legend */}
      <div className="flex ">
        <div className="flex flex-col gap-3 mb-8">
          {legendData.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col ">
                <span className="font-medium text-gray-800">{item.label}</span>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative w-full h-96 overflow-hidden">
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  // Get all possible identifiers
                  const props = geo.properties;

                  // Comprehensive name extraction
                  const possibleNames = [
                    props.name, // lowercase name
                    props.NAME, // uppercase NAME
                    props.name_long,
                    props.NAME_LONG,
                    props.sovereignt,
                    props.SOVEREIGNT,
                    props.admin,
                    props.ADMIN,
                    props.name_en,
                    props.NAME_EN,
                  ].filter(Boolean); // Remove undefined values

                  const name = possibleNames[0] || "Unknown Country";

                  // Comprehensive code extraction
                  const possibleCodes = [
                    props.iso_a3,
                    props.ISO_A3,
                    props.adm0_a3,
                    props.ADM0_A3,
                    props.iso_a2,
                    props.ISO_A2,
                    props.adm0_a2,
                    props.ADM0_A2,
                  ].filter(Boolean);

                  const code3 = possibleCodes.find((code) => code.length === 3);
                  const code2 = possibleCodes.find((code) => code.length === 2);

                  // Try multiple ways to find the data - be very thorough
                  const clientCount =
                    clientsData[code3] ||
                    clientsData[code2] ||
                    possibleNames.reduce(
                      (count, countryName) => count || clientsData[countryName],
                      0
                    );

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${name}: ${clientCount} clients`);
                      }}
                      onMouseLeave={() => setTooltipContent("")}
                      style={{
                        default: {
                          fill: getCountryColor(clientCount),
                          stroke: "#ffffff",
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: "#F53",
                          stroke: "#ffffff",
                          strokeWidth: 1,
                        },
                        pressed: {
                          fill: "#E42",
                          stroke: "#ffffff",
                          strokeWidth: 1,
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ComposableMap>

          {/* Tooltip */}
          {tooltipContent && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-90 text-white px-4 py-3 rounded-lg text-sm max-w-xs">
              <div className="whitespace-pre-line font-medium">
                {tooltipContent}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
