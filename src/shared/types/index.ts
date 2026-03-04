/**
 * 监控事件类型枚举
 */
export type MonitorEventType =
  | "js_error"
  | "promise_error"
  | "resource_error"
  | "white_screen"
  | "xhr"
  | "fetch"
  | "xhr_error"
  | "fetch_error"
  | "page_view"
  | "page_leave"
  | "user_click"
  | "batch_report";

/**
 * 监控事件基础结构
 */
export type BaseMonitorEvent = {
  /** 事件类型 */
  type: MonitorEventType;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  url: string;
  /** 用户代理 */
  userAgent?: string;
};

/**
 * 监控 SDK 配置
 */
export type MonitorConfig = {
  /** 数据上报接口地址 */
  endpoint: string;
  /** 批量上报接口地址 */
  batchEndpoint: string;
  /** 批量上报数量阈值 */
  batchSize: number;
  /** 批量上报时间间隔 (ms) */
  batchInterval: number;
  /** 是否启用性能监控 */
  enablePerformance: boolean;
  /** 是否启用异常监控 */
  enableError: boolean;
  /** 是否启用 HTTP 监控 */
  enableHttp: boolean;
  /** 是否启用用户行为监控 */
  enableUserBehavior: boolean;
  /** 是否启用白屏检测 */
  enableWhiteScreen: boolean;
  /** 采样率 (0-1) */
  sampleRate: number;
};
