import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { collectPerformanceMetrics, observeWebVitals } from "../utils";

describe("性能指标采集函数", () => {
  const originalWindow = globalThis.window;
  const originalPerformance = globalThis.performance;

  beforeEach(() => {
    vi.stubGlobal("window", undefined);
    vi.stubGlobal("performance", undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    globalThis.window = originalWindow;
    globalThis.performance = originalPerformance;
  });

  it("非浏览器环境应返回 null", () => {
    const result = collectPerformanceMetrics();
    expect(result).toBeNull();
  });

  it("应正确采集导航计时指标", () => {
    const mockNavigation = {
      domainLookupEnd: 105,
      domainLookupStart: 100,
      connectEnd: 115,
      connectStart: 105,
      responseStart: 120,
      requestStart: 115,
      domContentLoadedEventEnd: 500,
      fetchStart: 0,
      domInteractive: 300,
      responseEnd: 200,
    };

    vi.stubGlobal("window", {
      location: { href: "https://example.com" },
      performance: {
        getEntriesByType: vi.fn((type: string) => {
          if (type === "navigation") return [mockNavigation];
          if (type === "paint") return [];
          if (type === "largest-contentful-paint") return [];
          return [];
        }),
      },
    });
    vi.stubGlobal("performance", {
      getEntriesByType: vi.fn((type: string) => {
        if (type === "navigation") return [mockNavigation];
        if (type === "paint") return [];
        if (type === "largest-contentful-paint") return [];
        return [];
      }),
    });

    const result = collectPerformanceMetrics();

    expect(result).not.toBeNull();
    expect(result?.DNS).toBe(5);
    expect(result?.TCP).toBe(10);
    expect(result?.TTFB).toBe(5);
    expect(result?.url).toBe("https://example.com");
  });

  it("应正确采集 FCP 指标", () => {
    const mockPaintEntry = { name: "first-contentful-paint", startTime: 150 };

    vi.stubGlobal("window", {
      location: { href: "https://example.com" },
      performance: {
        getEntriesByType: vi.fn((type: string) => {
          if (type === "navigation") return [{ fetchStart: 0 }];
          if (type === "paint") return [mockPaintEntry];
          return [];
        }),
      },
    });
    vi.stubGlobal("performance", {
      getEntriesByType: vi.fn((type: string) => {
        if (type === "navigation") return [{ fetchStart: 0 }];
        if (type === "paint") return [mockPaintEntry];
        return [];
      }),
    });

    const result = collectPerformanceMetrics();

    expect(result?.FCP).toBe(150);
  });
});

describe("Web Vitals 观察函数", () => {
  it("不支持 PerformanceObserver 时应返回空函数", () => {
    vi.stubGlobal("PerformanceObserver", undefined);
    const callback = vi.fn();
    const unsubscribe = observeWebVitals(callback);
    expect(typeof unsubscribe).toBe("function");
    unsubscribe();
  });

  it("应返回取消订阅函数", () => {
    const mockDisconnect = vi.fn();
    const MockObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: mockDisconnect,
    }));

    vi.stubGlobal("PerformanceObserver", MockObserver);
    const callback = vi.fn();
    const unsubscribe = observeWebVitals(callback);

    unsubscribe();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
