/**
 * 错误类型枚举
 */
export type ErrorType =
  | "js_error"
  | "promise_error"
  | "resource_error"
  | "white_screen";

/**
 * 错误事件数据结构
 */
export type ErrorEvent = {
  /** 错误类型 */
  type: ErrorType;
  /** 错误消息 */
  message: string;
  /** 发生错误的文件名 */
  filename?: string;
  /** 行号 */
  lineno?: number;
  /** 列号 */
  colno?: number;
  /** 堆栈信息 */
  stack?: string;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  url: string;
  /** 用户代理 */
  userAgent: string;
  /** 发生次数 */
  count?: number;
};

/**
 * 错误分布数据结构
 */
export type ErrorDistribution = {
  /** 错误类型名称 */
  name: string;
  /** 数量 */
  value: number;
};

/**
 * 错误趋势数据结构
 */
export type ErrorTrend = {
  /** 日期 */
  date: string;
  /** JS 异常数量 */
  js: number;
  /** API 异常数量 */
  api: number;
  /** 资源异常数量 */
  resource: number;
  /** 白屏异常数量 */
  whiteScreen: number;
};

/**
 * 错误详情数据结构
 */
export type ErrorDetail = ErrorEvent & {
  /** 错误 ID */
  id: string;
  /** 浏览器信息 */
  browser?: string;
  /** 操作系统信息 */
  os?: string;
  /** 响应信息 (API 错误) */
  response?: string;
  /** 资源 URL (资源加载错误) */
  resource?: string;
  /** 性能指标 (白屏错误) */
  metrics?: string;
};
