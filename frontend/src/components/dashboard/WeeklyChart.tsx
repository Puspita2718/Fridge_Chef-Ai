"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Mon",
    calories: 2100,
  },
  {
    name: "Tue",
    calories: 2350,
  },
  {
    name: "Wed",
    calories: 1950,
  },
  {
    name: "Thu",
    calories: 2200,
  },
  {
    name: "Fri",
    calories: 2450,
  },
  {
    name: "Sat",
    calories: 2600,
  },
  {
    name: "Sun",
    calories: 2000,
  },
];

export function WeeklyChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} 
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar
          dataKey="calories"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
