export class Singleton {
  private static instance: Singleton;
  static getInstance(...args: any) {
    if (!this.instance) {
      // @ts-ignore
      this.instance = new this(...args);
    }
    return this.instance;
  }
}
