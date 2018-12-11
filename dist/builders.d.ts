import { InnerENV } from "./configs/env.config";
/**
 * ## astroboy.ts 预处理函数
 * * 硬核初始化routers
 * @description
 * @author Big Mogician
 * @export
 * @param {Partial<InnerENV>} {
 *   ctorFolder: base = defaultEnv.ctorFolder,
 *   routerFolder: routerBase = defaultEnv.routerFolder,
 *   routerAutoBuild: open = defaultEnv.routerAutoBuild,
 *   routerAlwaysBuild: always = defaultEnv.routerAlwaysBuild,
 *   routerRoot: root = defaultEnv.routerRoot
 * }
 */
export declare function initRouters({ ctorFolder: base, routerFolder: routerBase, routerAutoBuild: open, routerAlwaysBuild: always, routerRoot: root }: Partial<InnerENV>): void;
