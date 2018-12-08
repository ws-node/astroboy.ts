# 🌟astroboy.ts
> 基于[astroboy](https://github.com/astroboy-lab/astroboy)的DI版本，TypeScript3.2信仰加成

### 已经实现的功能

* 高性能依赖注入[ 实现：[@bonbons/di](https://www.npmjs.com/package/@bonbons/di) ]
* 控制器声明式路由[ 实现：[astroboy-router](https://www.npmjs.com/package/astroboy-router) ]
* 可配置容器定义化
* DI可注入依赖实现多重继承
* 配置容器对接astroboy标准configs模式
* 完整兼容astroboy原始语义，支持任意扩展
* 支持完整依赖注入能力的高级中间件
* 路由方法返回配置接口化

> 😨更多功能正在开发中...

### Wiki + Demo
* [Demo](https://github.com/ws-node/demo.astroboy.ts) - astroboy.ts 最小可用预览(可以切换本地和npm导包方式)
* [Core](https://github.com/ws-node/astroboy.ts/wiki/Core) - 核心组件
* [Services](https://github.com/ws-node/astroboy.ts/wiki/Services) - 内置服务列表
* [Configs/Options](https://github.com/ws-node/astroboy.ts/wiki/Configs-Options) - 配置列表
* [Decorators](https://github.com/ws-node/astroboy.ts/wiki/Decorators) - 装饰器列表
* [Functions](https://github.com/ws-node/astroboy.ts/wiki/Functions) - 功能函数
* [Interfaces](https://github.com/ws-node/astroboy.ts/wiki/Interfaces) - 公开接口列表

### 迭代记录

#### 1.0.1-rc.20
* 支持DI多重继承的能力

#### 1.0.1-rc.18
* 修复astroboy-router的一个兼容问题
* 移除@bonbons/di的定义输出，并修复部分接口

#### 1.0.1-rc.15
* 实现路由参数注入和类型安全映射
* 支持扩展基础注入器，实现路由参数字段注入

#### 1.0.1-rc.14
* 基本功能完成
* 修复一些问题

------

### 安装

```
npm install astroboy.ts
```
```
yarn add astroboy.ts
```

### 接入说明

#### 1. 按照astroboy框架要求创建应用程序目录（略）

#### 2. 调整app.ts

```typescript
import path from "path";
import { Server, Astroboy } from "astroboy.ts";

Server.Create(Astroboy, {
  ROOT_PATH: path.resolve(__dirname, "..")
}).run({
  onStart: () => console.log("hello world!"),
  onError: (err) => console.log(`oh shit : ${String(err)}`)
});

```

#### 3. 配置初始化中间件
> app/middleware/server-init.ts
```typescript

import { serverInit } from "astroboy.ts";

export = () => serverInit;

```
> config/middleware.default.js
```javascript

module.exports = {

  "server-init": {
    priority: 0.1,
    enable: true
  }

}
```
> config/config.default.js
```javascript
/**
 * 默认配置文件
 */
const path = require('path');

module.exports = {

  "@astroboy.ts": {
    showTrace: false,
    diType: "proxy"
  }

};

```

#### 4. 启动
```
ast dev --ts --inspect --tsconfig ./tsconfig.json
```
