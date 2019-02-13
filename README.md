# 🌟astroboy.ts

> 基于[astroboy](https://github.com/astroboy-lab/astroboy)的 DI 版本，TypeScript3.2 信仰加成

[![NPM][npm-icon]][npm-url]

[![Build status][ci-image]][ci-url]
[![Coverage Status][cover-image]][cover-url]

### 已经实现的功能

- 高性能依赖注入[ 实现：[@bonbons/di](https://www.npmjs.com/package/@bonbons/di) ]
- 控制器声明式路由[ 实现：[astroboy-router](https://www.npmjs.com/package/astroboy-router) ]
- 可扩展的注入式模版引擎
- 可配置容器定义化
- DI 可注入依赖实现多重继承
- 配置容器对接 astroboy 标准 configs 模式
- 自动化生成 astroboy 的 routers 规范
- 命令行工具支持
- 完整兼容 astroboy 原始语义，支持任意扩展
- 支持完整依赖注入能力的高级中间件
- 路由方法返回配置接口化

> 😨 更多功能正在开发中...

### Wiki + Demo

- [Demo1:多版本并存](https://github.com/ws-node/demo.astroboy.ts) - 最大兼容预览(多重代码风格可以共存)
- [Demo2:全量 astroboy.ts+构建 base 项目包](https://github.com/ws-node/demo2.astroboy.ts) - base 仓库预览(构建继承 astroboy.ts 的 base 项目)
- [Demo3:使用 base 仓库构建应用](https://github.com/ws-node/demo3.astroboy.ts) - 最大预览(使用 base 项目构建应用)
- [Core](https://github.com/ws-node/astroboy.ts/wiki/Core) - 核心组件
- [Services](https://github.com/ws-node/astroboy.ts/wiki/Services) - 内置服务列表
- [Configs/Options](https://github.com/ws-node/astroboy.ts/wiki/Configs-Options) - 配置列表
- [Decorators](https://github.com/ws-node/astroboy.ts/wiki/Decorators) - 装饰器列表
- [Functions](https://github.com/ws-node/astroboy.ts/wiki/Functions) - 功能函数
- [Interfaces](https://github.com/ws-node/astroboy.ts/wiki/Interfaces) - 公开接口列表

### 迭代记录

#### 1.0.6-rc.3

- rename `CMD` to `AtcCLI`

#### 1.0.7

- 1.0.7 功能锁定
- 调整 `package` 解构

#### 1.0.6

- 1.0.6 功能锁定

#### 1.0.5-rc.5

- 新增 `CMD` namespace

#### 1.0.5

- 1.0.5 功能锁定
- `atc` 支持并行类型检查，默认开启

#### 1.0.4

- 1.0.4 功能锁定

#### 1.0.3-rc.21

- 细节优化

#### 1.0.3-rc.16

- 新增全局错误处理

#### 1.0.3-rc.12

- 修复 `Injectable` 装饰器故障

#### 1.0.3-rc.9

- 增强多重继承的类型化写法
- `Render` 新增 `init` 重载钩子

#### 1.0.3-rc.7

- 所有基础服务全部完成契约化，可以通过 class 本身的 `Contract` 拿到其公共接口
- 调整 `RenderResult` 的原生参数配置
- 增加大量文档和注释

#### 1.0.3-rc.5

- DI 接入的重构
- `Injectable` 装饰器赠加新的重载

#### 1.0.3-rc.4

- 增加单元测试

#### 1.0.3-rc.1

- 功能锁定 1.0.3，开始新一轮 rc

#### 1.0.2-rc.39

- 调整了内部日志的记录方式
- 增强了 `RenderResult` 的模板扩展能力
- 强化了模板渲染异常的处理逻辑

#### 1.0.2-rc.37

- 增加 `atc-cli` 对 `router` 命令的 config 文件支持
- 调整配置文件参数

#### 1.0.2-rc.35

- 去除 `atc-cli` 对 js 的支持，去掉参数 `--ts`
- 调整视觉风格

#### 1.0.2-rc.31

- 修复找不到 `Controller` 的问题
- 修复 `nunjunks` 默认模板 root 路径不正确的问题

#### 1.0.2-rc.29

- 内置 `nunjunks` 模板渲染引擎
- 新增 `Render` DI 渲染服务，可以自定义实现

#### 1.0.2-rc.28

- `astt` 新增 `--config` 指令，允许使用配置文件启动 cli

#### 1.0.2-rc.24

- `astt` 更名 `atc` ，并支持新的 `dev` 命令

#### 1.0.2-rc.23

- `astt-cli` 新增 `tsconfig` 配置支持
- `astt-cli` 新增 `details` 配置支持

#### 1.0.2-rc.20

- `JsonResult` 内置了支持模板定制的能力
- 新增 `RenderResult` 对象能力
- 新增 `CONFIG_VIEW` config 描述 astroboy 的 view 配置

#### 1.0.2-rc.18

- 新增 `__BASE_ROUTE_DECO_FACTORY` 装饰器，为 `Route` 自定义提供最高扩展性

#### 1.0.2-rc.16

- `astt-cli` 工具已加入，支持生成 routers

#### 1.0.2-rc.1

- 锁定 1.02 功能，开始新一轮 rc

#### 1.0.1-rc.30

- 针对 `@Controller` 修饰过的 ts 控制器，将自动生成对应的 router.ts 文件
- 当不存在 `app/routers` 文件夹的时候自动创建
- 提供了一个独立的初始化`routers`的函数来支持进行发布前的预处理
- 默认不执行初始化动作，可以选择预处理或是动态处理任意一种方式来实现

#### 1.0.1-rc.22

- 重新调整 `Context` 和 `AstroboyContext` 对于 `ctx` 类型复写的行为
- `AstroboyContext` 现在支持复写 `app` 和 `config` 字段的类型
- `Context` 取消在 `AstroboyContext` 中公开，只在继承链路中可见

#### 1.0.1-rc.20

- 支持 DI 多重继承的能力

#### 1.0.1-rc.18

- 修复 `astroboy-router` 的一个兼容问题
- 移除 `@bonbons/di` 的定义输出，并修复部分接口

#### 1.0.1-rc.15

- 实现路由参数注入和类型安全映射
- 支持扩展基础注入器，实现路由参数字段注入

#### 1.0.1-rc.14

- 基本功能完成
- 修复一些问题

---

### 安装

```
npm install astroboy.ts
```

```
yarn add astroboy.ts
```

### 接入说明

#### 1. 按照 astroboy 框架要求创建应用程序目录（略）

#### 2. 调整 app.ts

```typescript
import path from "path";
import { Server, Astroboy } from "astroboy.ts";

Server.Create(Astroboy, {
  ROOT_PATH: path.resolve(__dirname, "..")
}).run({
  onStart: () => console.log("hello world!"),
  onError: err => console.log(`oh shit : ${String(err)}`)
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
};
```

> config/config.default.js

```javascript
/**
 * 默认配置文件
 */
const path = require("path");

module.exports = {
  "@astroboy.ts": {
    showTrace: false,
    diType: "proxy"
  }
};
```

#### 4. 启动

```
# 本地安装astrpboy.ts
./node_modules/.bin/atc dev --inspect --tsconfig app/tsconfig.json
# 全局装过astrpboy.ts
atc dev --inspect --tsconfig app/tsconfig.json
```

### 开发姿势

#### 0.cli 配置文件

astroboy.ts 开放了一个配置文件，用来简化 cli 参数的使用，类似 webpack，可以使用--config 参数修改配置文件的名字。

> atc.config.js - 一个简单的配置文件

```javascript
const path = require("path");

module.exports = {
  tsconfig: "tsconfig.json",
  inspect: true,
  typeCheck: true,
  transpile: true,
  debug: "*",
  mock: "http://127.0.0.1:8001",
  // atc router 的命令配置
  routers: {
    enabled: true,
    always: false,
    approot: "/v1",
    filetype: "ts",
    details: true
  },
  // atc-cli监控的文件修改列表，自动重启node服务
  watch: [
    path.join(__dirname, "app/**/*.*"),
    path.join(__dirname, "config/**/*.*"),
    path.join(__dirname, "plugins/**/*.*")
  ],
  // 忽略的文件列表
  ignore: []
};
```

#### 1.编写路由控制器

控制器方面使用装饰器来定制 Router 的业务层级，确定 Route 的 url 和 method，提供 params 和 body 的注入获取能力，并抽象了响应中 body 的写入能力。

> app/controllers/test.ts

```typescript
import {
  Controller,
  Configs,
  AstroboyContext,
  ENV,
  JsonResult,
  GET,
  POST,
  FromParams,
  FromBody,
  Deserialize,
  IContext
} from "astroboy.ts";

interface GetQuery {
  id: string;
  name: string;
  type: string;
}

interface PostData {
  id: number;
  name: string;
}

@Controller("test")
class TestController {
  // 构造函数注入能力
  constructor(
    private configs: Configs,
    private base: AstroboyContext<IContext>
  ) {}

  // GET: {项目前缀}/api/test/testGet/:type?id=xxxx&name=xxxx
  @GET("testGet/:type")
  // 显式进行params参数前提，作为路由方法参数
  // 使用接口为了更好的类型描述，不会进行任何运行时类型处理
  public methodGet(@FromParams() params: GetQuery) {
    const { ctx } = this.base;
    const { id, name, type } = params;
    ctx.type = "application/json";
    // JsonResult实现了IResult接口，提供将json内容编程化写入body的能力，同时提供了Configs容器的配置化支持
    // 你可以自己实现自定义逻辑，只要实现IResult接口即可
    return new JsonResult({
      id,
      name,
      type,
      url: ctx.url
    });
  }

  // POST: {项目前缀}/api/post/:type?id=xxxx&name=xxxx
  @POST("post/:type")
  // body也能进行相似的流程实现参数前提
  // 你仍然可以进行直接解构
  public async methodPost(
    @FromParams() params: GetQuery,
    @FromBody() { id, name }: PostData
  ) {
    const { name, id: id2, type } = params;
    return new JsonResult({
      id,
      name,
      type,
      id2,
      name
    });
  }
}

export = TestController;
```

到此一个业务路由层级的构建并没有完成，和原生 astroboy 开发类似，相应的需要一个 router 文件来创建 astroboy 的 router 数组定义。

> app/routers/test.ts

```typescript
import TEST from "../controllers/test";
import { buildRouter } from "astroboy.ts";

// “test”代表controllers内的文件级别
// “/v1”代表应用的路由前缀，这里只作为示例
export = buildRouter(TEST, "test", "/v1");
```

> 注：1.0.1-rc.27 版本以后已经支持自动生成 router，不需再要上述步骤，有两种模式任选其一，操作如下：

##### 1. routers 预处理模式

- 使用 `astroboy.ts` 提供的命令行工具

```bash
# 在开发启动或者生产打包前确保执行即可
./node_modules/.bin/atc router --always --filetype ts
```

##### 2. 动态初始化(不推荐)

- 配置 `app/app.ts` 文件 (但是在删除控制器后，需要手动删除 routers 中多余的文件)

```typescript
Server.Create(..., {
  ...
})
  .option(ROUTER_OPTIONS, { appRoot: "/v1", enabled: true })
  ...
```

到此一个完整的业务级别的 router 构造完成了。

#### 2.编写可注入服务

astroboy.ts 按照 IoC 模式的指导思路进行设计，所有的服务都应该按照 DI 的方式（无论是手动还是自动）获取、组装和构造逻辑层级。

> app/services/test.ts

```typescript
import { Injectable } from "astroboy.ts";

@Injectable()
class TestService {
  private value = 98765;

  public add(v: number) {
    this.value += v;
  }

  public showValue() {
    return this.value;
  }
}

export = TestService;
```

astroboy.ts 服务的默认行为是范围单例（scoped），简单的描述来说，一个服务在同一个请求流程中总是保持单例状态，并在请求结束后释放。scoped 服务可以在请求流程中的任意位置获取，并承担数据传输载体的职责。

你当然可以手动改变这一默认行为：

```typescript
// 请确保你了解type的含义，以免服务出现不符合预期的行为
@Injectable({ type: InjectScope.Singleton })
class Test02Service {
  ...
}
```

其他行为：

- new（每次获取总是创建一个全新的对象）
- singleton（在整个应用中保持唯一并积累副作用）

服务还具有其他高级功能（包括依赖注入分离和实现多重继承），这里不一一展开了。

#### 3.对接 astroboy 的配置

创建接口来描述 astroboy 的配置中的各个业务部分：

> config/options/demo.ts

```typescript
import { createConfig } from "astroboy.ts";

interface DemoOptions {
  /** ccccc */
  key01: number;
  key02: string;
}

export const DEMO_OPTIONS = createConfig<DemoOptions>("demo");
```

> config/config.default.js

```javascript
/**
 * 默认配置文件
 */
const path = require("path");

module.exports = {
  "@astroboy.ts": {
    showTrace: true,
    diType: "proxy"
  },

  demo: {
    key01: 12345,
    key02: "woshinidie"
  },

  strOpt: "test_string_config"
};
```

这样既可以更好的描述原本混乱的 config 文件，同时可以在对 config 访问的时候提供定义支持。

```typescript
// 注入Configs服务，然后获取配置
// opts变量将会被正确的绑定上类型信息
const opts = this.configs.get(DEMO_OPTIONS);
```

#### 4.在中间件中使用依赖注入

过程比较轻量，废话不多，直接上 demo：

> app/middlewares/demo.ts

```typescript
import { injectScope, ENV, Context } from "astroboy.ts";
import DataService from "../services/Data";

export = () =>
  injectScope(async ({ injector, configs, ctx, next }) => {
    // console.log(configs.get(ENV).showTrace);
    const data = injector.get(DataService);
    data.setStamp(new Date().getTime());
    await next();
    // console.log("fuck");
  });
```

> 文档完善中...

---

## MIT License

Copyright (c) 2018 NODE.Mogician <[bigmogician@outlook.com](bigmogician@outlook.com)>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm-icon]: https://nodei.co/npm/astroboy.ts.svg?downloads=true
[npm-url]: https://npmjs.org/package/astroboy.ts
[ci-image]: https://travis-ci.org/ws-node/astroboy.ts.svg?branch=master
[ci-url]: https://travis-ci.org/ws-node/astroboy.ts
[cover-image]: https://coveralls.io/repos/github/ws-node/astroboy.ts/badge.svg?branch=master
[cover-url]: https://coveralls.io/github/ws-node/astroboy.ts?branch=master
