export class Utils {
  static arraysIntersect(a: Array<any>, b: Array<any>): boolean {
    return a.filter(x => b.includes(x)).length > 0;
  }
}
