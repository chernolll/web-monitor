/**
 * 告警规则类型
 */
export type AlertRuleType = "threshold" | "pattern" | "frequency" | "custom";

/**
 * 告警条件
 */
export type AlertCondition = {
  /** 指标名称 (阈值规则) */
  metric?: string;
  /** 比较运算符 */
  operator?: ">" | "<" | ">=" | "<=" | "==" | "!=";
  /** 阈值 */
  value?: number;
  /** 正则模式 (模式匹配规则) */
  pattern?: string;
  /** 字段名 */
  field?: string;
  /** 次数 (频率规则) */
  count?: number;
  /** 时间窗口 (秒) */
  timeWindow?: number;
  /** 自定义表达式 */
  expression?: string;
};

/**
 * 告警动作类型
 */
export type AlertActionType = "email" | "slack" | "webhook" | "log";

/**
 * 告警动作
 */
export type AlertAction = {
  /** 动作类型 */
  type: AlertActionType;
  /** 配置参数 */
  config: Record<string, unknown>;
};

/**
 * 告警规则
 */
export type AlertRule = {
  /** 规则 ID */
  id: string;
  /** 规则名称 */
  name: string;
  /** 规则描述 */
  description?: string;
  /** 规则类型 */
  type: AlertRuleType;
  /** 触发条件 */
  condition: AlertCondition;
  /** 触发动作列表 */
  actions: AlertAction[];
  /** 是否启用 */
  enabled: boolean;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
};

/**
 * 告警事件
 */
export type AlertEvent = {
  /** 事件 ID */
  id: string;
  /** 规则 ID */
  ruleId: string;
  /** 规则名称 */
  ruleName: string;
  /** 触发时间 */
  triggeredAt: string;
  /** 触发数据 */
  data: Record<string, unknown>;
  /** 执行的动作 */
  actions: AlertAction[];
};
