import { describe, expect, it } from "vitest";
import type { HttpRequest, HttpSuccessRate } from "@/modules/http/types";

describe("HTTP 监控类型", () => {
  it("应该创建有效的 HTTP 请求对象", () => {
    const request: HttpRequest = {
      id: "1",
      url: "/api/users",
      method: "GET",
      status: 200,
      duration: 120,
      timestamp: Date.now(),
      pageUrl: "https://example.com/dashboard",
    };

    expect(request.status).toBe(200);
    expect(request.method).toBe("GET");
  });

  it("应该正确计算成功率", () => {
    const successRate: HttpSuccessRate = {
      total: 100,
      success: 98,
      failed: 2,
      rate: 98,
    };

    expect(successRate.rate).toBe(98);
    expect(successRate.total).toBe(successRate.success + successRate.failed);
  });
});
