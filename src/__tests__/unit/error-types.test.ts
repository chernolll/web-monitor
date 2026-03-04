import { describe, expect, it } from "vitest";
import type { ErrorEvent, ErrorType } from "@/modules/error/types";

describe("异常监控类型", () => {
  it("应该创建有效的错误事件对象", () => {
    const errorEvent: ErrorEvent = {
      type: "js_error",
      message: "Uncaught TypeError: Cannot read property of undefined",
      filename: "app.js",
      lineno: 142,
      colno: 23,
      stack: "Error at app.js:142:23",
      timestamp: Date.now(),
      url: "https://example.com/page",
      userAgent: "Mozilla/5.0",
    };

    expect(errorEvent.type).toBe("js_error");
    expect(errorEvent.lineno).toBe(142);
  });

  it("应该支持所有错误类型", () => {
    const errorTypes: ErrorType[] = [
      "js_error",
      "promise_error",
      "resource_error",
      "white_screen",
    ];

    expect(errorTypes).toHaveLength(4);
  });
});
