import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Mon', value: 2400, color: '#8B5CF6' },
  { name: 'Tue', value: 2100, color: '#10B981' },
  { name: 'Wed', value: 1800, color: '#F59E0B' },
  { name: 'Thu', value: 1500, color: '#06B6D4' },
  { name: 'Fri', value: 2200, color: '#A855F7' },
  { name: 'Sat', value: 1700, color: '#3B82F6' },
  { name: 'Sun', value: 300, color: '#F87171' }
];

const totalEarnings = data.reduce((sum, item) => sum + item.value, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-gray-800 font-semibold">{data.name}</p>
        <p className="text-blue-600 font-bold">
          ${data.value.toLocaleString()}
        </p>
        <p className="text-gray-500 text-sm">
          {((data.value / totalEarnings) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col space-y-2 ml-8">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-600 text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

// Custom label that renders inside the pie chart without blocking hover
const renderCustomizedLabel = () => {
  return (
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-3xl font-bold fill-gray-800"
    >
      ${totalEarnings.toLocaleString()}
    </text>
  );
};

export default function WeeklyEarningsChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#0170DA] max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Earning</h2>
        <div className="w-12 h-1 bg-cyan-400 rounded-full mt-1"></div>
      </div>

      <div className="flex items-center justify-center">
        <div className="w-80 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={140}
                paddingAngle={3}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              {/* Center text that doesn't block hover */}
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-3xl font-bold fill-gray-800 pointer-events-none"
                style={{ fontSize: '24px', fontWeight: 'bold', fill: '#1f2937' }}
              >
                ${totalEarnings.toLocaleString()}
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <CustomLegend payload={data.map(item => ({ value: item.name, color: item.color }))} />
      </div>
    </div>
  );
}