# 🌟astroboy.ts
> 基于[astroboy](https://github.com/astroboy-lab/astroboy)的DI版本，TypeScript3.2信仰加成

### 已经实现的功能

* 高性能依赖注入[ 实现：[@bonbons/di](https://www.npmjs.com/package/@bonbons/di) ]
* 控制器声明式路由[ 实现：[astroboy-router](https://www.npmjs.com/package/astroboy-router) ]
* 可配置容器定义化
* DI可注入依赖实现多重继承
* 配置容器对接astroboy标准configs模式
* 自动化生成astroboy的routers规范
* 完整兼容astroboy原始语义，支持任意扩展
* 支持完整依赖注入能力的高级中间件
* 路由方法返回配置接口化

> 😨更多功能正在开发中...

### Wiki + Demo
* [Demo](https://github.com/ws-node/demo2.astroboy.ts) - astroboy.ts 最新功能预览(可以切换本地和npm导包方式)
* [Demo](https://github.com/ws-node/demo.astroboy.ts) - astroboy.ts 最大兼容预览(可以切换本地和npm导包方式)
* [Core](https://github.com/ws-node/astroboy.ts/wiki/Core) - 核心组件
* [Services](https://github.com/ws-node/astroboy.ts/wiki/Services) - 内置服务列表
* [Configs/Options](https://github.com/ws-node/astroboy.ts/wiki/Configs-Options) - 配置列表
* [Decorators](https://github.com/ws-node/astroboy.ts/wiki/Decorators) - 装饰器列表
* [Functions](https://github.com/ws-node/astroboy.ts/wiki/Functions) - 功能函数
* [Interfaces](https://github.com/ws-node/astroboy.ts/wiki/Interfaces) - 公开接口列表

### 迭代记录

#### 1.0.1-rc.27
* 针对 `@Controller` 修饰过的ts控制器，将自动生成对应的router.js文件
* 当不存在 `app/routers` 文件夹的时候自动创建
* 提供了一个独立的初始化`routers`的函数来支持进行发布前的预处理

#### 1.0.1-rc.22
* 重新调整 `Context` 和 `AstroboyContext` 对于 `ctx` 类型复写的行为
* `AstroboyContext` 现在支持复写 `app` 和 `config` 字段的类型
* `Context` 取消在 `AstroboyContext` 中公开，只在继承链路中可见

#### 1.0.1-rc.20
* 支持DI多重继承的能力

#### 1.0.1-rc.18
* 修复 `astroboy-router` 的一个兼容问题
* 移除 `@bonbons/di` 的定义输出，并修复部分接口

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
ast dev --ts --inspect --tsconfig tsconfig.json
```

### 开发姿势

#### 1.编写路由控制器

控制器方面使用装饰器来定制Router的业务层级，确定Route的url和method，提供params和body的注入获取能力，并抽象了响应中body的写入能力。

> app/controllers/test.ts
```typescript
import {
  Controller, Configs, AstroboyContext,
  ENV, JsonResult, GET, POST, FromParams,
  FromBody, Deserialize, IContext
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
    private base: AstroboyContext<IContext>) {

  }

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
      url: ctx.url,
    });
  }

  // POST: {项目前缀}/api/post/:type?id=xxxx&name=xxxx
  @POST("post/:type")
  // body也能进行相似的流程实现参数前提
  // 你仍然可以进行直接解构
  public async methodPost(@FromParams() params: GetQuery, @FromBody() { id, name }: PostData) {
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

到此一个业务路由层级的构建并没有完成，和原生astroboy开发类似，相应的需要一个router文件来创建astroboy的router数组定义。

> app/routers/test.ts
```typescript
import TEST from "../controllers/test";
import { buildRouter } from "astroboy.ts";

// “test”代表controllers内的文件级别
// “/v1”代表应用的路由前缀，这里只作为示例
export = buildRouter(TEST, "test", "/v1");

```

> 注：rc.23版本以后已经支持自动生成router，不需再要上述步骤

到此一个完整的业务级别的router构造完成了。

#### 2.编写可注入服务

astroboy.ts按照IoC模式的指导思路进行设计，所有的服务都应该按照DI的方式（无论是手动还是自动）获取、组装和构造逻辑层级。

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

astroboy.ts服务的默认行为是范围单例（scoped），简单的描述来说，一个服务在同一个请求流程中总是保持单例状态，并在请求结束后释放。scoped服务可以在请求流程中的任意位置获取，并承担数据传输载体的职责。

你当然可以手动改变这一默认行为：
```typescript
// 请确保你了解type的含义，以免服务出现不符合预期的行为
@Injectable({ type: InjectScope.Singleton })
class Test02Service {
  ...
}
```

其他行为：
* new（每次获取总是创建一个全新的对象）
* singleton（在整个应用中保持唯一并积累副作用）

服务还具有其他高级功能（包括依赖注入分离和实现多重继承），这里不一一展开了。

#### 3.对接astroboy的配置

创建接口来描述astroboy的配置中的各个业务部分：
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
const path = require('path');

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

这样既可以更好的描述原本混乱的config文件，同时可以在对config访问的时候提供定义支持。

```typescript
// 注入Configs服务，然后获取配置
// opts变量将会被正确的绑定上类型信息
const opts = this.configs.get(DEMO_OPTIONS);
```

#### 4.在中间件中使用依赖注入

过程比较轻量，废话不多，直接上demo：
> app/middlewares/demo.ts
```typescript
import { injectScope, ENV, Context } from "astroboy.ts";
import DataService from "../services/Data";

export = () => injectScope(async ({ injector, configs, ctx, next }) => {
  // console.log(configs.get(ENV).showTrace);
  const data = injector.get(DataService);
  data.setStamp(new Date().getTime());
  await next();
  // console.log("fuck");
});
```

> 文档完善中...
