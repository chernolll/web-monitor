import type {
  PerformanceMetrics,
  PerformanceScore,
  PerformanceThreshold,
} from "../types";
import { PERFORMANCE_THRESHOLDS } from "../types";

/**
 * 计算单个指标的评分等级
 * @param value 指标值
 * @param threshold 阈值配置
 * @returns 评分等级
 */
export function calculateMetricScore(
  value: number,
  threshold: PerformanceThreshold,
): PerformanceScore["score"] {
  if (value <= threshold.good) {
    return "good";
  }
  if (value <= threshold.needsImprovement) {
    return "needs-improvement";
  }
  return "poor";
}

/**
 * 计算性能指标评分
 * @param metrics 性能指标数据
 * @returns 评分结果数组
 */
export function calculatePerformanceScore(
  metrics: Partial<PerformanceMetrics>,
): PerformanceScore[] {
  const scores: PerformanceScore[] = [];

  for (const threshold of PERFORMANCE_THRESHOLDS) {
    const value = metrics[threshold.metric];
    if (value !== undefined) {
      scores.push({
        metric: threshold.metric,
        value,
        score: calculateMetricScore(value, threshold),
      });
    }
  }

  return scores;
}

/**
 * 计算整体性能评分 (0-100)
 * @param scores 各指标评分
 * @returns 整体评分
 */
export function calculateOverallScore(scores: PerformanceScore[]): number {
  if (scores.length === 0) return 0;

  const weights: Record<string, number> = {
    LCP: 0.25,
    FCP: 0.2,
    TTI: 0.2,
    FP: 0.15,
    TTFB: 0.1,
    DNS: 0.05,
    TCP: 0.05,
    DOMReady: 0,
  };

  let totalWeight = 0;
  let weightedScore = 0;

  for (const score of scores) {
    const weight = weights[score.metric] ?? 0;
    if (weight > 0) {
      totalWeight += weight;
      const scoreValue =
        score.score === "good"
          ? 100
          : score.score === "needs-improvement"
            ? 50
            : 0;
      weightedScore += scoreValue * weight;
    }
  }

  return totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;
}
