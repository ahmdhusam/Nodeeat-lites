export interface IClassConstructor<T = any> extends Function {
  new (...args: any[]): T;
}
