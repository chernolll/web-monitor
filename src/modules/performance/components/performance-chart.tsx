"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PerformanceTrend } from "../types";

export type PerformanceChartProps = {
  /** 性能趋势数据 */
  data: PerformanceTrend[];
  /** 显示的指标列表 */
  metrics?: ("FP" | "FCP" | "LCP" | "TTI")[];
  /** 图表高度 */
  height?: number;
};

const METRIC_COLORS: Record<string, string> = {
  FP: "#22c55e",
  FCP: "#3b82f6",
  LCP: "#f59e0b",
  TTI: "#ef4444",
};

const METRIC_LABELS: Record<string, string> = {
  FP: "首次绘制 (FP)",
  FCP: "首次内容绘制 (FCP)",
  LCP: "最大内容绘制 (LCP)",
  TTI: "可交互时间 (TTI)",
};

/**
 * 性能趋势图表组件
 */
export function PerformanceChart({
  data,
  metrics = ["FP", "FCP", "LCP", "TTI"],
  height = 300,
}: PerformanceChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} />
        <YAxis
          stroke="#9ca3af"
          fontSize={12}
          tickLine={false}
          tickFormatter={(value) => `${value}ms`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f2937",
            border: "1px solid #374151",
            borderRadius: "8px",
          }}
          labelStyle={{ color: "#f3f4f6" }}
          formatter={(value, name) => [
            `${Number(value).toFixed(0)}ms`,
            METRIC_LABELS[String(name)] ?? String(name),
          ]}
        />
        <Legend
          formatter={(value) => METRIC_LABELS[String(value)] ?? String(value)}
        />
        {metrics.map((metric) => (
          <Line
            key={metric}
            type="monotone"
            dataKey={metric}
            stroke={METRIC_COLORS[metric]}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
