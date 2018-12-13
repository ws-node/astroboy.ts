export interface CommandPlugin {
  name: string;
  description: string;
  options: Array<[string, string]>;
  action: (...args: any[]) => void;
  help: (...args: any[]) => void;
}