export class Utils {
  static arraysIntersect(a: Array<any>, b: Array<any>): Array<any> {
    return a.filter(x => b.includes(x));
  }
}
