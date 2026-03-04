/**
 * 性能指标数据结构
 */
export type PerformanceMetrics = {
  /** 首次绘制时间 (First Paint) */
  FP: number;
  /** 首次内容绘制时间 (First Contentful Paint) */
  FCP: number;
  /** 最大内容绘制时间 (Largest Contentful Paint) */
  LCP: number;
  /** 可交互时间 (Time to Interactive) */
  TTI: number;
  /** DOM 就绪时间 */
  DOMReady: number;
  /** DNS 解析时间 */
  DNS: number;
  /** TCP 连接时间 */
  TCP: number;
  /** 首字节时间 (Time to First Byte) */
  TTFB: number;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  url: string;
};

/**
 * 性能趋势数据结构
 */
export type PerformanceTrend = {
  /** 日期 */
  date: string;
  FP: number;
  FCP: number;
  LCP: number;
  TTI: number;
  DOMReady: number;
  DNS: number;
  TCP: number;
  TTFB: number;
};

/**
 * 性能阈值配置
 */
export type PerformanceThreshold = {
  /** 指标名称 */
  metric: keyof Omit<PerformanceMetrics, "timestamp" | "url">;
  /** 良好阈值 */
  good: number;
  /** 需要改进阈值 */
  needsImprovement: number;
};

/**
 * 性能阈值常量配置
 */
export const PERFORMANCE_THRESHOLDS: PerformanceThreshold[] = [
  { metric: "FP", good: 100, needsImprovement: 300 },
  { metric: "FCP", good: 100, needsImprovement: 300 },
  { metric: "LCP", good: 250, needsImprovement: 400 },
  { metric: "TTI", good: 300, needsImprovement: 500 },
];

/**
 * 性能评分结果
 */
export type PerformanceScore = {
  /** 指标名称 */
  metric: keyof Omit<PerformanceMetrics, "timestamp" | "url">;
  /** 指标值 */
  value: number;
  /** 评分等级 */
  score: "good" | "needs-improvement" | "poor";
};
