import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FreelancersWorldMap = ({ title }) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  // Comprehensive freelancer data with multiple country identifiers
  const freelancersData = {
    // United States
    USA: 1200,
    US: 1200,
    "United States": 1200,
    "United States of America": 1200,
    // India
    IND: 800,
    IN: 800,
    India: 800,
    // Bangladesh
    BGD: 600,
    BD: 600,
    Bangladesh: 600,
    // Pakistan
    PAK: 400,
    PK: 400,
    Pakistan: 400,
    // France
    FRA: 2000,
    FR: 2000,
    France: 2000,
    // United Kingdom
    GBR: 1500,
    GB: 1500,
    "United Kingdom": 1500,
    UK: 1500,
    // Germany
    DEU: 1100,
    DE: 1100,
    Germany: 1100,
    // Canada
    CAN: 900,
    CA: 900,
    Canada: 900,
    // Australia
    AUS: 700,
    AU: 700,
    Australia: 700,
    // Brazil
    BRA: 500,
    BR: 500,
    Brazil: 500,
    // Mexico
    MEX: 300,
    MX: 300,
    Mexico: 300,
    // Japan
    JPN: 1000,
    JP: 1000,
    Japan: 1000,
    // China
    CHN: 1800,
    CN: 1800,
    China: 1800,
    // Russia
    RUS: 400,
    RU: 400,
    Russia: 400,
    "Russian Federation": 400,
    // Nigeria
    NGA: 350,
    NG: 350,
    Nigeria: 350,
    // Egypt
    EGY: 200,
    EG: 200,
    Egypt: 200,
    // South Africa
    ZAF: 180,
    ZA: 180,
    "South Africa": 180,
    // Kenya
    KEN: 150,
    KE: 150,
    Kenya: 150,
    // Morocco
    MAR: 120,
    MA: 120,
    Morocco: 120,
    // Tunisia
    TUN: 100,
    TN: 100,
    Tunisia: 100,
    // Western Sahara (for the specific case in the debug log)
    ESH: 50,
    "W. Sahara": 50,
    "Western Sahara": 50,
    // Additional countries
    ESP: 800,
    ES: 800,
    Spain: 800,
    ITA: 750,
    IT: 750,
    Italy: 750,
    NLD: 650,
    NL: 650,
    Netherlands: 650,
    SWE: 600,
    SE: 600,
    Sweden: 600,
    POL: 550,
    PL: 550,
    Poland: 550,
  };

  const legendData = [
    { color: "#1e40af", label: "1500+ freelancers", count: 1500 },
    { color: "#3b82f6", label: "1000-1499 freelancers", count: 1000 },
    { color: "#60a5fa", label: "500-999 freelancers", count: 500 },
    { color: "#93c5fd", label: "100-499 freelancers", count: 100 },
  ];

  // Function to get color based on freelancer count
  const getCountryColor = (freelancerCount) => {
    if (freelancerCount >= 1500) return "#1e40af"; // Dark blue for high count
    if (freelancerCount >= 1000) return "#3b82f6"; // Blue for medium-high count
    if (freelancerCount >= 500) return "#60a5fa"; // Light blue for medium count
    if (freelancerCount >= 100) return "#93c5fd"; // Very light blue for low count
    if (freelancerCount > 0) return "#dbeafe"; // Very light blue for any data
    return "#D6D6DA"; // Gray for no data
  };

  return (
    <div className="w-full mx-auto rounded-lg shadow-xl p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 mb-6">{title}</h1>

      {/* Legend */}

      <div className="flex ">
        <div className="flex flex-col gap-3 mb-8">
          {legendData.map((item, index) => (
            <div key={index} className="flex  items-center gap-3">
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
                  const freelancerCount =
                    freelancersData[code3] ||
                    freelancersData[code2] ||
                    possibleNames.reduce(
                      (count, countryName) =>
                        count || freelancersData[countryName],
                      0
                    );

                  // Debug logging for first few countries
                  if (geographies.indexOf(geo) < 3) {
                    console.log("Freelancer Country debug:", {
                      name,
                      code3,
                      code2,
                      count: freelancerCount,
                      allProps: props,
                      possibleNames,
                      possibleCodes,
                    });
                  }

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setHoveredCountry({
                          name: name,
                          count: freelancerCount,
                        });
                      }}
                      onMouseLeave={() => setHoveredCountry(null)}
                      style={{
                        default: {
                          fill: getCountryColor(freelancerCount),
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
          {hoveredCountry && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-90 text-white px-4 py-3 rounded-lg text-sm">
              <div className="font-medium">{hoveredCountry.name}</div>
              <div className="text-xs">Freelancers: {hoveredCountry.count}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancersWorldMap;
