import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { HealthMetrics } from '../../types/reports';

type HealthMetricsChartProps = {
  data: HealthMetrics[];
};

const HealthMetricsChart: React.FC<HealthMetricsChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Gesundheitsstatistiken
      </h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="count" 
              name="Tierarztbesuche" 
              fill="#4F46E5" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HealthMetricsChart;