import { useState } from 'react';

const FreelancersWorldMap = ({title}) => {
  const [hoveredCountry, setHoveredCountry] = useState(null);

  const legendData = [
    { color: '#1e40af', label: 'Bangladesh', count: 3000 },
    { color: '#16a34a', label: 'France', count: 2000 },
    { color: '#4ade80', label: 'France', count: 1000 }
  ];

  const countryData = {
    bangladesh: { name: 'Bangladesh', count: 3000, color: '#1e40af' },
    france: { name: 'France', count: 2000, color: '#16a34a' },
    // Add more countries as needed
  };

  return (
    <div className="w-full mx-auto rounded-lg shadow-xl p-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-blue-700 mb-6">{title}</h1>

      {/* Legend */}

      <div className='flex '>


        <div className="flex flex-col gap-3 mb-8">
          {legendData.map((item, index) => (
            <div key={index} className="flex  items-center gap-3">
              <div
                className="w-5 h-5 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <div className='flex flex-col '>
                <span className="font-medium text-gray-800">{item.label}</span>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Map Container */}
        <div className="relative w-full h-52 overflow-hidden">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* World Map Paths */}

            {/* North America */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M50 80 L200 70 L220 50 L250 60 L280 80 L290 120 L270 160 L200 180 L160 150 L140 120 L100 100 L70 90 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'North America', count: 0 })}
            />

            {/* South America */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M180 250 L230 240 L250 260 L270 300 L280 350 L270 380 L240 390 L220 380 L200 360 L190 320 L185 280 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'South America', count: 0 })}
            />

            {/* Europe */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M420 100 L480 95 L490 110 L500 125 L485 140 L470 135 L450 130 L430 120 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Europe (Other)', count: 0 })}
            />

            {/* France - highlighted */}
            <path
              className="stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              style={{ fill: '#16a34a' }}
              d="M440 110 L465 108 L470 120 L465 130 L450 132 L440 125 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'France', count: 2000 })}
            />

            {/* Africa */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M420 180 L480 170 L520 180 L540 220 L550 280 L540 340 L520 360 L480 370 L450 365 L420 350 L410 320 L415 280 L420 240 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Africa', count: 0 })}
            />

            {/* Asia */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M520 80 L650 70 L720 80 L780 90 L800 120 L790 160 L750 180 L700 175 L650 170 L600 175 L560 180 L530 160 L525 130 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Asia (Other)', count: 0 })}
            />

            {/* Bangladesh - highlighted */}
            <path
              className="stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              style={{ fill: '#1e40af' }}
              d="M680 160 L695 158 L700 168 L695 175 L685 177 L680 170 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Bangladesh', count: 3000 })}
            />

            {/* India */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M640 160 L680 155 L695 165 L700 185 L690 210 L670 220 L650 215 L635 200 L630 180 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'India', count: 0 })}
            />

            {/* China */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M650 100 L720 95 L750 105 L770 120 L765 145 L740 155 L700 150 L670 145 L650 135 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'China', count: 0 })}
            />

            {/* Australia */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M720 350 L780 345 L800 355 L810 370 L800 385 L770 390 L740 385 L720 375 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Australia', count: 0 })}
            />

            {/* Russia */}
            <path
              className="fill-gray-300 stroke-white stroke-1 hover:opacity-80 cursor-pointer transition-opacity"
              d="M520 60 L700 50 L800 55 L850 65 L880 80 L870 100 L820 110 L750 105 L680 100 L600 105 L550 100 L525 85 Z"
              onMouseEnter={() => setHoveredCountry({ name: 'Russia', count: 0 })}
            />
          </svg>

          {/* Tooltip */}
          {hoveredCountry && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-3 py-2 rounded text-sm">
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