# Txios - 使用 TypeScript 开发的类 Axios 库

> 注释详细，源码阅读第一站

## 特性

## 亮点

## 使用

## 项目结构

```
.
├── LICENSE
├── README.md
├── package-lock.json
├── package.json
├── rollup.config.ts	---------------------- rollup 配置文件
├── sandbox	-------------------------------- 沙盒，运行样例以查看效果
├── src
│   ├── cancel	---------------------------- 取消请求的主要实现
│   │   ├── Cancel.ts	---------------------- 封装取消请求的信息
│   │   └── CancelToken.ts ----------------- 取消请求类
│   ├── core	------------------------------ 核心
│   │   ├── InterceptorManager.ts	---------- 拦截器类
│   │   ├── Txios.ts	---------------------- Txios 核心类
│   │   ├── dispatchRequest.ts	------------ 综合处理并分发请求
│   │   ├── mergeConfig.ts	---------------- 配置合并，策略模式
│   │   ├── transform.ts	------------------ 转换
│   │   └── xhr.ts	------------------------ 封装 xhr，真正发送请求
│   ├── defaults.ts	------------------------ 默认配置
│   ├── helpers	---------------------------- 辅助方法
│   │   ├── cookie.ts	---------------------- 处理 cookie
│   │   ├── data.ts	------------------------ 处理 data
│   │   ├── error.ts ----------------------- 处理 error
│   │   ├── headers.ts --------------------- 处理 headers
│   │   └── url.ts	------------------------ 处理 url
│   ├── txios.ts	-------------------------- 入口
│   ├── types.ts	-------------------------- 接口声明
│   └── utils.ts	-------------------------- 工具方法
├── test	---------------------------------- Jest 测试
├── tsconfig.json	-------------------------- tsc 配置文件
└── tslint.json	---------------------------- lint 配置
```

## 源码阅读路径

