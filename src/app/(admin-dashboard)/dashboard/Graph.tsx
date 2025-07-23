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

import dayjs from 'dayjs';




const Graph = ({ data }: { data: any[] }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-200 my-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Performance Overview
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>

          {/* Soft Grid */}
          <CartesianGrid
            vertical={false} stroke="#e2e8f0"                 // x axis line
          // horizontal={false} strokeDasharray="6 6" stroke="#e2e8f0"          y axis 
          // stroke="none"         hide line or box
          // strokeDasharray="6 6" stroke="#e2e8f0"      dashed lines x and y axis

          />


          {/* Axis */}
          {/* <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} />     normal x axis */}

          <XAxis
            dataKey="date"
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => dayjs(value).format('DD-MMM-YY')}
          />



          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${value / 1000000}M`;
              if (value >= 1000) return `${value / 1000}K`;
              return value;
            }}
          />



          {/* Tooltip */}
          {/* <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}
            labelStyle={{ color: '#4b5563' }}
            itemStyle={{ color: '#4b5563' }}
          /> */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: 8,
              padding: 12,
            }}
            labelStyle={{ color: '#4b5563', fontWeight: 500 }}
            itemStyle={{ color: '#4b5563' }}
            cursor={{
              stroke: 'rgba(96,165,250,0.15)',  // light blue fill (15% opacity)
              strokeWidth: 60,                  // wide vertical bar
            }}
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

            <linearGradient id="hoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
          </defs>



          {/* Data Areas */}
          <Area
            type="monotone"                     // Smooth curved area
            dataKey="sales"                    // Y-axis values from "sales"
            stroke="#60a5fa"                   // Line color
            strokeWidth={2}
            fill="url(#colorSales)"           // Gradient fill under the line
            name="Sales"                       // Tooltip name
          />

          <Area
            type="monotone"
            dataKey="orders"
            stroke="#f87171"
            strokeWidth={2}
            fill="url(#colorOrders)"
            name="Orders"
          />

          {/* Legend */}
          {/* <Legend verticalAlign="top" height={36} iconType="circle" />   Order & Sales */}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
