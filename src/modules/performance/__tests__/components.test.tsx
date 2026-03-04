import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PerformanceCard } from "../components/performance-card";
import { PerformanceChart } from "../components/performance-chart";
import type { PerformanceScore, PerformanceTrend } from "../types";

// Mock ResizeObserver for Recharts
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

describe("PerformanceChart 组件", () => {
  const mockData: PerformanceTrend[] = [
    {
      date: "2024-01-01",
      FP: 100,
      FCP: 150,
      LCP: 250,
      TTI: 300,
      DNS: 20,
      TCP: 30,
      TTFB: 50,
      DOMReady: 400,
    },
  ];

  it("应正确渲染图表", () => {
    const { container } = render(<PerformanceChart data={mockData} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("应支持自定义指标列表", () => {
    const { container } = render(
      <PerformanceChart data={mockData} metrics={["FP", "FCP"]} />,
    );
    expect(container.firstChild).toBeTruthy();
  });
});

describe("PerformanceCard 组件", () => {
  it("应正确渲染良好评分", () => {
    const score: PerformanceScore = {
      metric: "FP",
      value: 50,
      score: "good",
    };

    render(<PerformanceCard score={score} />);
    expect(screen.getByText("首次绘制")).toBeTruthy();
    expect(screen.getByText("良好")).toBeTruthy();
  });

  it("应正确渲染需改进评分", () => {
    const score: PerformanceScore = {
      metric: "LCP",
      value: 300,
      score: "needs-improvement",
    };

    render(<PerformanceCard score={score} />);
    expect(screen.getByText("最大内容绘制")).toBeTruthy();
    expect(screen.getByText("需改进")).toBeTruthy();
  });

  it("应正确渲染较差评分", () => {
    const score: PerformanceScore = {
      metric: "TTI",
      value: 600,
      score: "poor",
    };

    render(<PerformanceCard score={score} />);
    expect(screen.getByText("可交互时间")).toBeTruthy();
    expect(screen.getByText("较差")).toBeTruthy();
  });
});
