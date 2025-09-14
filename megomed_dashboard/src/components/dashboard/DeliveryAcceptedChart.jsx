import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { day: 'Mon', value: 60, fullDay: 'Monday' },
  { day: 'Tue', value: 78, fullDay: 'Tuesday' },
  { day: 'Wed', value: 40, fullDay: 'Wednesday' },
  { day: 'Thu', value: 68, fullDay: 'Thursday' },
  { day: 'Fri', value: 60, fullDay: 'Friday' },
  { day: 'Sat', value: 25, fullDay: 'Saturday' },
  { day: 'Sun', value: 62, fullDay: 'Sunday' }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-gray-800 font-semibold">{data.payload.fullDay}</p>
        <p className="text-blue-600 font-bold">
          {data.value}% accepted
        </p>
      </div>
    );
  }
  return null;
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={4} 
        textAnchor="end" 
        fill="#9CA3AF" 
        fontSize="12"
        fontWeight="400"
      >
        {payload.value}%
      </text>
    </g>
  );
};

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        textAnchor="middle" 
        fill="#9CA3AF" 
        fontSize="12"
        fontWeight="400"
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function DeliveryAcceptedChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0170DA] max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Delivery accepted</h2>
        <div className="bg-gray-100 rounded-full px-4 py-2">
          <span className="text-sm text-gray-600 font-medium">Last 7 Days</span>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barCategoryGap="20%"
          >
            <XAxis 
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={<CustomXAxisTick />}
              height={40}
            />
            <YAxis 
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80]}
              axisLine={false}
              tickLine={false}
              tick={<CustomYAxisTick />}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
            <Bar 
              dataKey="value" 
              fill="#002282"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}