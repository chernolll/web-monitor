import type { PerformanceMetrics } from "../types";

/**
 * 采集页面性能指标
 * @returns 性能指标数据，如果不在浏览器环境则返回 null
 */
export function collectPerformanceMetrics(): PerformanceMetrics | null {
  if (typeof window === "undefined" || !window.performance) {
    return null;
  }

  const metrics: Partial<PerformanceMetrics> = {
    timestamp: Date.now(),
    url: window.location.href,
  };

  // 采集导航计时指标
  const navigation = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming;
  if (navigation) {
    metrics.DNS = navigation.domainLookupEnd - navigation.domainLookupStart;
    metrics.TCP = navigation.connectEnd - navigation.connectStart;
    metrics.TTFB = navigation.responseStart - navigation.requestStart;
    metrics.DOMReady =
      navigation.domContentLoadedEventEnd - navigation.fetchStart;
    metrics.FP = navigation.responseEnd - navigation.fetchStart;
  }

  // 采集 FCP
  const paintEntries = performance.getEntriesByType("paint");
  const fcpEntry = paintEntries.find(
    (entry) => entry.name === "first-contentful-paint",
  );
  if (fcpEntry) {
    metrics.FCP = fcpEntry.startTime;
  }

  // 采集 LCP
  if (typeof PerformanceObserver !== "undefined") {
    try {
      const lcpEntries = performance.getEntriesByType(
        "largest-contentful-paint",
      );
      const lcpEntry = lcpEntries[
        lcpEntries.length - 1
      ] as LargestContentfulPaint;
      if (lcpEntry) {
        metrics.LCP = lcpEntry.startTime;
      }
    } catch {
      // LCP 采集失败时忽略
    }
  }

  // 采集 TTI (简化版：使用 DOMInteractive 作为近似值)
  if (navigation) {
    metrics.TTI = navigation.domInteractive - navigation.fetchStart;
  }

  return metrics as PerformanceMetrics;
}

/**
 * 采集 Web Vitals 指标
 * @param callback 回调函数，接收指标数据
 */
export function observeWebVitals(
  callback: (metrics: Partial<PerformanceMetrics>) => void,
): () => void {
  if (typeof PerformanceObserver === "undefined") {
    return () => {};
  }

  const observers: PerformanceObserver[] = [];

  // 观察 LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as LargestContentfulPaint;
      callback({ LCP: lastEntry.startTime });
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    observers.push(lcpObserver);
  } catch {
    // 忽略不支持的浏览器
  }

  // 观察 FID
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as PerformanceEventTiming;
      callback({ TTI: firstEntry.processingStart - firstEntry.startTime });
    });
    fidObserver.observe({ type: "first-input", buffered: true });
    observers.push(fidObserver);
  } catch {
    // 忽略不支持的浏览器
  }

  // 返回取消观察函数
  return () => {
    for (const observer of observers) {
      observer.disconnect();
    }
  };
}
