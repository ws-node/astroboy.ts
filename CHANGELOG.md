# CHANGELOG

## 迭代记录

### 1.1.3-rc.36

- 修复问题，调整 DevTool 的 console 输出风格

### 1.1.3-rc.34

- 最小 node 版本提高到 8.0

### 1.1.3-rc.30

- 优化中间件编译，force 默认编译到 ts

### 1.1.3-rc.27

- 改进了编译指令的健壮性和稳定性，修复一些存在的问题

### 1.1.3-rc.17

- [ BREAKING CHANGE ] 废除装饰器 `DefineConfig` 并删除，config 改为纯函数导出，并支持多函数

### 1.1.3-rc.16

- `atc` 新增 `middleware` 编译命令，支持对 ts 格式的 `middleware` 执行编译操作，简化 DI 能力支持

### 1.1.3-rc.4

- 提供新的装饰器 `DefineConfig` 优化 config 的书写方式

### 1.1.3-rc.2

- 移除 `astroboy` 的依赖，只作为开发依赖，可以解除 `astroboy` 版本的绑定

### 1.1.2-rc.2

- 调整 `atc config --force` 命令的行为，不会删掉 config 文件夹，只会清除所有 js 文件

### 1.1.1-rc.1

- 调整 `atc config --force` 命令的行为，变得更加强硬，现在会强行撸掉 output 重新生成

### 1.1.0

- 1.1.0 功能锁定

### 1.0.11-rc.17

- `atc` 新增 `config` 编译命令，支持对 ts 格式的 `config` 执行编译操作，支持 config-DI 能力

### 1.0.11-rc.7

- [ BREAKING CHANGE ] 调整了构造工厂函数的格式要求，废弃 `1.0.9-rc.1` 的改动

### 1.0.11-rc.4

- `Server` 部分函数支持继承树扩展
- 少量代码重构

### 1.0.11-rc.2

- 新增 `Bundles` 特性支持移动 DI

### 1.0.11

- 更新 `@bonbons/di` 到 1.3.5
- 增加 UT 覆盖

### 1.0.9-rc.1

- [ BREAKING CHANGE ] 调整 DI 接受工厂函数的类型，工厂函数 `injector` 和 `configs`

### 1.0.8

- 1.0.8 功能锁定

### 1.0.7-rc.3

- 恢复 `tsconfig-paths` 支持

#### 1.0.7-rc.1

- 调整版本策略

#### 1.0.7

- 1.0.7 功能锁定
- 调整 `package` 解构
- 修复问题

#### 1.0.6-rc.3

- [ BREAKING CHANGE ] rename `CMD` to `AtcCLI`

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

- [ BREAKING CHANGE ] 调整 `RenderResult` 的原生参数配置
- 所有基础服务全部完成契约化，可以通过 class 本身的 `Contract` 拿到其公共接口
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

- [ BREAKING CHANGE ] 调整配置文件参数
- 增加 `atc-cli` 对 `router` 命令的 config 文件支持

#### 1.0.2-rc.35

- [ BREAKING CHANGE ] 去除 `atc-cli` 对 js 的支持，去掉参数 `--ts`
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

- [ BREAKING CHANGE ] `astt` 更名 `atc` ，并支持新的 `dev` 命令

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

- [ BREAKING CHANGE ] 重新调整 `Context` 和 `AstroboyContext` 对于 `ctx` 类型复写的行为
- [ BREAKING CHANGE ] `Context` 取消在 `AstroboyContext` 中公开，只在继承链路中可见
- `AstroboyContext` 现在支持复写 `app` 和 `config` 字段的类型

#### 1.0.1-rc.20

- 支持 DI 多重继承的能力

#### 1.0.1-rc.18

- [ BREAKING CHANGE ] 移除 `@bonbons/di` 的定义输出，并修复部分接口
- 修复 `astroboy-router` 的一个兼容问题

#### 1.0.1-rc.15

- 实现路由参数注入和类型安全映射
- 支持扩展基础注入器，实现路由参数字段注入

#### 1.0.1-rc.14

- 基本功能完成
- 修复一些问题

---
