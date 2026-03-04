/**
 * HTTP 请求方法
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

/**
 * HTTP 请求数据结构
 */
export type HttpRequest = {
  /** 请求 ID */
  id: string;
  /** 请求 URL */
  url: string;
  /** 请求方法 */
  method: HttpMethod;
  /** 响应状态码 */
  status: number;
  /** 请求耗时 (ms) */
  duration: number;
  /** 响应大小 */
  size?: string;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  pageUrl: string;
  /** 调用次数 */
  count?: number;
};

/**
 * HTTP 状态码分布
 */
export type HttpStatusDistribution = {
  /** 状态码描述 */
  name: string;
  /** 占比 */
  value: number;
};

/**
 * HTTP 趋势数据结构
 */
export type HttpTrend = {
  /** 日期 */
  date: string;
  /** 成功率 */
  success: number;
  /** 错误率 */
  error: number;
};

/**
 * HTTP 成功率统计
 */
export type HttpSuccessRate = {
  /** 总请求数 */
  total: number;
  /** 成功请求数 */
  success: number;
  /** 失败请求数 */
  failed: number;
  /** 成功率 (%) */
  rate: number;
};
