"use client";

import type { PerformanceScore } from "../types";

export type PerformanceCardProps = {
  /** 指标评分 */
  score: PerformanceScore;
};

const SCORE_COLORS: Record<string, string> = {
  good: "text-green-500",
  "needs-improvement": "text-yellow-500",
  poor: "text-red-500",
};

const SCORE_LABELS: Record<string, string> = {
  good: "良好",
  "needs-improvement": "需改进",
  poor: "较差",
};

const METRIC_LABELS: Record<string, string> = {
  FP: "首次绘制",
  FCP: "首次内容绘制",
  LCP: "最大内容绘制",
  TTI: "可交互时间",
  TTFB: "首字节时间",
  DNS: "DNS 解析",
  TCP: "TCP 连接",
  DOMReady: "DOM 就绪",
};

/**
 * 性能指标卡片组件
 */
export function PerformanceCard({ score }: PerformanceCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-sm">
          {METRIC_LABELS[score.metric] ?? score.metric}
        </span>
        <span
          className={`text-xs px-2 py-1 rounded ${SCORE_COLORS[score.score]} bg-gray-700`}
        >
          {SCORE_LABELS[score.score]}
        </span>
      </div>
      <div className={`text-2xl font-bold mt-2 ${SCORE_COLORS[score.score]}`}>
        {score.value.toFixed(0)}
        <span className="text-sm text-gray-400 ml-1">ms</span>
      </div>
    </div>
  );
}
