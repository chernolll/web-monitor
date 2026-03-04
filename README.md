# Web Monitor

前端监控系统 - 基于 Next.js 16 构建

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: React 19
- **语言**: TypeScript 5
- **样式**: Tailwind CSS 4
- **代码质量**: Biome (替代 ESLint + Prettier)
- **Git Hooks**: Lefthook + lint-staged
- **测试**: Vitest + Testing Library
- **提交规范**: Commitlint

## 快速开始

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 运行测试
pnpm test

# 代码检查
pnpm lint

# 构建生产版本
pnpm build
```

## 项目结构

```
src/
├── modules/           # 功能模块
│   ├── performance/   # 性能监控
│   ├── error/         # 异常监控
│   ├── http/          # HTTP 监控
│   ├── user-behavior/ # 用户行为
│   └── alert/         # 告警模块
├── shared/            # 共享资源
│   ├── types/         # 通用类型
│   └── utils/         # 工具函数
└── __tests__/         # 测试文件
```

## 开发进度

- [x] Phase 1: 基础设施搭建
- [ ] Phase 2: 性能监控模块
- [ ] Phase 3: 异常监控模块
- [ ] Phase 4: HTTP 监控模块
- [ ] Phase 5: 用户行为模块
- [ ] Phase 6: 告警模块
- [ ] Phase 7: 集成与优化
