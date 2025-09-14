import { Card, Skeleton, Typography } from 'antd';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const { Title } = Typography;

const Revenue = () => {
  // Demo data instead of API call
  const demoData = [
    { month: 'Jan', revenue: 12500 },
    { month: 'Feb', revenue: 18900 },
    { month: 'Mar', revenue: 14200 },
    { month: 'Apr', revenue: 21000 },
    { month: 'May', revenue: 18500 },
    { month: 'Jun', revenue: 23400 },
    { month: 'Jul', revenue: 27600 },
    { month: 'Aug', revenue: 19800 },
    { month: 'Sep', revenue: 23100 },
    { month: 'Oct', revenue: 25400 },
    { month: 'Nov', revenue: 28700 },
    { month: 'Dec', revenue: 31200 }
  ];

  const isLoading = false; // Since we're using demo data

  if (isLoading) {
    return (
      <div className='w-full'>
        <Card className="border border-primary" title={<Title level={5}>Total Revenue</Title>}>
          <Skeleton active paragraph={{ rows: 9 }} />
        </Card>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <p style={{ color: '#336C79' }}>
            <strong>${payload[0].value.toLocaleString()}</strong>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full'>
      <Card
        className="border border-[#0170DA]"
        title={<Title level={5}>Total Revenue</Title>}
      >
        <ResponsiveContainer width="100%" height={330}>
          <LineChart data={demoData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#041B44"
              strokeWidth={2}
              dot={{ r: 5 }}
              name="Monthly Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Revenue;