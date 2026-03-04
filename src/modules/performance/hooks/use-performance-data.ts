import { useCallback, useEffect, useState } from "react";
import type { PerformanceMetrics, PerformanceScore } from "../types";
import {
  calculateOverallScore,
  calculatePerformanceScore,
  collectPerformanceMetrics,
  observeWebVitals,
} from "../utils";

export type UsePerformanceDataResult = {
  /** 性能指标数据 */
  metrics: PerformanceMetrics | null;
  /** 各指标评分 */
  scores: PerformanceScore[];
  /** 整体评分 (0-100) */
  overallScore: number;
  /** 是否正在加载 */
  loading: boolean;
  /** 错误信息 */
  error: Error | null;
  /** 刷新数据 */
  refresh: () => void;
};

/**
 * 性能数据采集 Hook
 * @param options 配置选项
 * @returns 性能数据结果
 */
export function usePerformanceData(options?: {
  /** 是否自动采集 */
  autoCollect?: boolean;
  /** 采集间隔 (ms) */
  interval?: number;
}): UsePerformanceDataResult {
  const { autoCollect = true, interval } = options ?? {};

  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [scores, setScores] = useState<PerformanceScore[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const collectData = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      const data = collectPerformanceMetrics();
      if (data) {
        setMetrics(data);
        const calculatedScores = calculatePerformanceScore(data);
        setScores(calculatedScores);
        setOverallScore(calculateOverallScore(calculatedScores));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("采集失败"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoCollect) return;

    // 初始采集
    collectData();

    // 观察 Web Vitals
    const unsubscribe = observeWebVitals((vitalMetrics) => {
      setMetrics((prev) => {
        if (!prev) return prev;
        const updated = { ...prev, ...vitalMetrics };
        const newScores = calculatePerformanceScore(updated);
        setScores(newScores);
        setOverallScore(calculateOverallScore(newScores));
        return updated;
      });
    });

    // 定时采集
    let timer: ReturnType<typeof setInterval> | undefined;
    if (interval && interval > 0) {
      timer = setInterval(collectData, interval);
    }

    return () => {
      unsubscribe();
      if (timer) clearInterval(timer);
    };
  }, [autoCollect, interval, collectData]);

  return {
    metrics,
    scores,
    overallScore,
    loading,
    error,
    refresh: collectData,
  };
}
