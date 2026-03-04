import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePerformanceData } from "../hooks";

// Mock performance APIs
const mockPerformanceMetrics = {
  FP: 150,
  FCP: 200,
  LCP: 300,
  TTI: 400,
  DNS: 35,
  TCP: 45,
  TTFB: 120,
  timestamp: Date.now(),
  url: "https://example.com",
};

vi.mock("../utils", () => ({
  collectPerformanceMetrics: vi.fn(() => mockPerformanceMetrics),
  observeWebVitals: vi.fn(() => () => {}),
  calculatePerformanceScore: vi.fn(() => [
    { metric: "FP", value: 150, score: "needs-improvement" },
    { metric: "FCP", value: 200, score: "needs-improvement" },
    { metric: "LCP", value: 300, score: "needs-improvement" },
    { metric: "TTI", value: 400, score: "needs-improvement" },
  ]),
  calculateOverallScore: vi.fn(() => 50),
}));

describe("usePerformanceData Hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("应正确采集性能数据", async () => {
    const { result } = renderHook(() => usePerformanceData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.metrics).toEqual(mockPerformanceMetrics);
    expect(result.current.scores).toHaveLength(4);
    expect(result.current.overallScore).toBe(50);
    expect(result.current.loading).toBe(false);
  });

  it("应支持手动刷新", async () => {
    const { result } = renderHook(() => usePerformanceData());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await act(async () => {
      result.current.refresh();
    });

    expect(result.current.loading).toBe(false);
  });

  it("autoCollect=false 时不自动采集", async () => {
    const { result } = renderHook(() =>
      usePerformanceData({ autoCollect: false }),
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.metrics).toBeNull();
  });

  it("应返回刷新函数", () => {
    const { result } = renderHook(() => usePerformanceData());

    expect(typeof result.current.refresh).toBe("function");
  });
});
