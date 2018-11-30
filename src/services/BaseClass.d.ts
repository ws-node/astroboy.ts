export class BaseClass {
  public ctx: any;
  public app: any;
  public config: any;
  constructor(ctx: any);
  getConfig(...args): any;
  getServiceClass(...args): any;
  getService(...args): any;
  callService(...args): any;
  invokeServiceMethod(...args): any;
  getLib(...args): any;
}