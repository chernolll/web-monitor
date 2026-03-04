/**
 * 页面访问数据结构
 */
export type PageView = {
  /** 事件类型 */
  type: "page_view";
  /** 页面 URL */
  url: string;
  /** 来源页面 */
  referrer: string;
  /** 时间戳 */
  timestamp: number;
  /** 用户代理 */
  userAgent: string;
};

/**
 * 页面离开数据结构
 */
export type PageLeave = {
  /** 事件类型 */
  type: "page_leave";
  /** 页面 URL */
  url: string;
  /** 停留时长 (ms) */
  stayDuration: number;
  /** 时间戳 */
  timestamp: number;
};

/**
 * 用户点击数据结构
 */
export type UserClick = {
  /** 事件类型 */
  type: "user_click";
  /** 元素标签名 */
  tagName: string;
  /** 元素 ID */
  id?: string;
  /** 元素类名 */
  className?: string;
  /** 元素文本内容 */
  innerText?: string;
  /** 时间戳 */
  timestamp: number;
  /** 页面 URL */
  url: string;
};

/**
 * 用户会话数据结构
 */
export type UserSession = {
  /** 会话 ID */
  sessionId: string;
  /** 用户 ID */
  userId?: string;
  /** 开始时间 */
  startTime: number;
  /** 结束时间 */
  endTime?: number;
  /** 页面浏览量 */
  pageViews: number;
  /** 点击次数 */
  clicks: number;
  /** 错误次数 */
  errors: number;
};

/**
 * PV/UV 数据结构
 */
export type PvUvData = {
  /** 日期 */
  date: string;
  /** 页面浏览量 */
  pv: number;
  /** 独立访客数 */
  uv: number;
};
