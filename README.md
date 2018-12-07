# Astroboy.ts
> [astroboy](https://github.com/astroboy-lab/astroboy) 在typescript语义中的优雅实现

### 实现的功能

* 高性能依赖注入[ 实现：[@bonbons/di](https://www.npmjs.com/package/@bonbons/di) ]
* 控制器声明式路由[ 实现：[astroboy-router](https://www.npmjs.com/package/astroboy-router) ]
* 可配置容器定义化
* 配置容器对接astroboy标准configs模式
* 完整兼容astroboy原始语义，支持任意扩展
* 支持完整依赖注入能力的高级中间件
* 路由方法返回配置接口化

> 😨更多功能正在开发中...

### Wiki + Demo
* [Demo](https://github.com/ws-node/demo.astroboy.ts)
* [Core](https://github.com/ws-node/astroboy.ts/wiki/Core)
* [Services](https://github.com/ws-node/astroboy.ts/wiki/Services)
* [Decorators](https://github.com/ws-node/astroboy.ts/wiki/Decorators)
* [Functions](https://github.com/ws-node/astroboy.ts/wiki/Functions)
* [Interfaces](https://github.com/ws-node/astroboy.ts/wiki/Interfaces)

### 迭代记录

#### 1.0.1-rc.17
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
