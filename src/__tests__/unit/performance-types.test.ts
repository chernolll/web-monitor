import { describe, expect, it } from "vitest";
import type { PerformanceMetrics } from "@/modules/performance/types";
import { PERFORMANCE_THRESHOLDS } from "@/modules/performance/types";

describe("性能监控类型", () => {
  it("应该有正确的阈值配置", () => {
    expect(PERFORMANCE_THRESHOLDS).toHaveLength(4);

    const fpThreshold = PERFORMANCE_THRESHOLDS.find((t) => t.metric === "FP");
    expect(fpThreshold).toBeDefined();
    expect(fpThreshold?.good).toBe(100);
    expect(fpThreshold?.needsImprovement).toBe(300);
  });

  it("应该创建有效的性能指标对象", () => {
    const metrics: PerformanceMetrics = {
      FP: 150,
      FCP: 320,
      LCP: 780,
      TTI: 950,
      DOMReady: 450,
      DNS: 35,
      TCP: 45,
      TTFB: 120,
      timestamp: Date.now(),
      url: "https://example.com",
    };

    expect(metrics.FP).toBe(150);
    expect(metrics.url).toBe("https://example.com");
  });
});
