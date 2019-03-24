import { ChildProcess, spawn, exec } from "child_process";

export interface ChildProcessContext {
  type: "spawn" | "exec";
  command?: string;
  args?: string[];
  env?: { [prop: string]: any };
  slient?: boolean;
}

export function startChildProcess({
  command = "node",
  args = [],
  env = {},
  slient = false,
  type = "spawn"
}: ChildProcessContext): Promise<number> {
  return new Promise((resolve, reject) => {
    let child: ChildProcess;
    try {
      if (type === "spawn") {
        child = spawn(command, args, {
          env: {
            ...process.env,
            ...env
          },
          stdio: !!slient ? "pipe" : ["pipe", process.stdout, process.stderr]
        });
      } else {
        child = exec(
          `${command} ${args.join(" ")}`,
          {
            env: {
              ...process.env,
              ...env
            }
          },
          (error, stdout, stderr) => {
            if (error) return reject(error);
            if (stderr) {
              return reject(
                new Error(`child process exit with error ${stderr}`)
              );
            }
            return resolve(0);
          }
        );
      }
    } catch (error) {
      return reject(error);
    }
    if (type !== "spawn") return;
    child.on("exit", (code, signal) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(
          new Error(`child process exit with code ${code} [${signal || "-"}]`)
        );
      }
    });
  });
}
