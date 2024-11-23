import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { MonthlyRevenue } from '../../types/reports';

type RevenueChartProps = {
  data: MonthlyRevenue[];
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Einnahmen & Ausgaben
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} €`} />
            <Area
              type="monotone"
              dataKey="revenue"
              stackId="1"
              stroke="#4F46E5"
              fill="#4F46E5"
              fillOpacity={0.6}
              name="Einnahmen"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stackId="2"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.6}
              name="Ausgaben"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;