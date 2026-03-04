import { describe, expect, it } from "vitest";
import { PERFORMANCE_THRESHOLDS } from "../types";
import {
  calculateMetricScore,
  calculateOverallScore,
  calculatePerformanceScore,
} from "../utils/score";

describe("性能评分计算函数", () => {
  describe("calculateMetricScore", () => {
    it("良好指标应返回 good", () => {
      const threshold = PERFORMANCE_THRESHOLDS.find((t) => t.metric === "FP");
      expect(threshold).toBeDefined();
      if (threshold) {
        expect(calculateMetricScore(50, threshold)).toBe("good");
      }
    });

    it("需要改进指标应返回 needs-improvement", () => {
      const threshold = PERFORMANCE_THRESHOLDS.find((t) => t.metric === "FP");
      expect(threshold).toBeDefined();
      if (threshold) {
        expect(calculateMetricScore(200, threshold)).toBe("needs-improvement");
      }
    });

    it("较差指标应返回 poor", () => {
      const threshold = PERFORMANCE_THRESHOLDS.find((t) => t.metric === "FP");
      expect(threshold).toBeDefined();
      if (threshold) {
        expect(calculateMetricScore(500, threshold)).toBe("poor");
      }
    });
  });

  describe("calculatePerformanceScore", () => {
    it("应正确计算各指标评分", () => {
      const metrics = {
        FP: 150,
        FCP: 200,
        LCP: 300,
        TTI: 400,
        timestamp: Date.now(),
        url: "https://example.com",
      };

      const scores = calculatePerformanceScore(metrics);

      expect(scores).toHaveLength(4);
      const fpScore = scores.find((s) => s.metric === "FP");
      expect(fpScore?.score).toBe("needs-improvement");
    });

    it("空指标应返回空数组", () => {
      const scores = calculatePerformanceScore({
        timestamp: Date.now(),
        url: "https://example.com",
      });
      expect(scores).toHaveLength(0);
    });
  });

  describe("calculateOverallScore", () => {
    it("应正确计算整体评分", () => {
      const scores = [
        { metric: "FP" as const, value: 50, score: "good" as const },
        { metric: "FCP" as const, value: 100, score: "good" as const },
        { metric: "LCP" as const, value: 200, score: "good" as const },
        { metric: "TTI" as const, value: 250, score: "good" as const },
      ];

      const overall = calculateOverallScore(scores);
      expect(overall).toBe(100);
    });

    it("混合评分应正确计算", () => {
      const scores = [
        { metric: "FP" as const, value: 50, score: "good" as const },
        {
          metric: "FCP" as const,
          value: 200,
          score: "needs-improvement" as const,
        },
        { metric: "LCP" as const, value: 500, score: "poor" as const },
      ];

      const overall = calculateOverallScore(scores);
      expect(overall).toBeGreaterThan(0);
      expect(overall).toBeLessThan(100);
    });

    it("空数组应返回 0", () => {
      expect(calculateOverallScore([])).toBe(0);
    });
  });
});
