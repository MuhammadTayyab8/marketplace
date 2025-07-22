'use client';
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const Graph = ({ data }: { data: any[] }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-s, border border-gray-200 dark:bg-gray-900 dark:border-gray-700 my-10">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Performance Overview
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          {/* Soft Grid */}
          <CartesianGrid strokeDasharray="6 6" stroke="#e2e8f0" />

          {/* Axis */}
          <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}
            labelStyle={{ color: '#4b5563' }}
            itemStyle={{ color: '#4b5563' }}
          />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#60a5fa" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#f87171" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Data Areas */}
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#60a5fa"
            fill="url(#colorSales)"
            name="Sales"
          />
          <Area
            type="monotone"
            dataKey="orders"
            stroke="#f87171"
            fill="url(#colorOrders)"
            name="Orders"
          />

          {/* Legend */}
          <Legend verticalAlign="top" height={36} iconType="circle" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
