
import * as React from "react";
import {
  Bar,
  Line,
  Pie,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: {
    labels: string[];
    datasets: {
      label?: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  height?: number | string;
}

export function BarChart({ data, height = 300 }: ChartProps) {
  const chartData = data.labels.map((label, index) => {
    const item: Record<string, any> = { name: label };
    data.datasets.forEach((dataset) => {
      item[dataset.label || "value"] = dataset.data[index];
    });
    return item;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Bar
            key={index}
            dataKey={dataset.label || "value"}
            fill={
              typeof dataset.backgroundColor === "string"
                ? dataset.backgroundColor
                : Array.isArray(dataset.backgroundColor)
                ? dataset.backgroundColor[0]
                : "#8884d8"
            }
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({ data, height = 300 }: ChartProps) {
  const chartData = data.labels.map((label, index) => {
    const item: Record<string, any> = { name: label };
    data.datasets.forEach((dataset) => {
      item[dataset.label || "value"] = dataset.data[index];
    });
    return item;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.datasets.map((dataset, index) => (
          <Line
            key={index}
            type="monotone"
            dataKey={dataset.label || "value"}
            stroke={dataset.borderColor || "#8884d8"}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export function PieChart({ data, height = 300 }: ChartProps) {
  const chartData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index],
  }));

  const COLORS = Array.isArray(data.datasets[0].backgroundColor)
    ? data.datasets[0].backgroundColor
    : ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#83a6ed"];

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Tooltip
          formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
        />
        <Legend />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length] as string}
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
