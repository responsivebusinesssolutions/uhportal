import { Utils } from './utils';

describe('arraysIntersect', () => {
  it('should return 2', () => {
    const a = [1, 2, 3, 4, 5, 6];
    const b = [1, 2, 7, 8, 9];
    const intersection = Utils.arraysIntersect(a, b);

    expect(intersection.length).toEqual(2);
  });

  it('should return 0', () => {
    const a = [1, 2, 3, 4, 5, 6];
    const b = [7, 8, 9, 10, 11];
    const intersection = Utils.arraysIntersect(a, b);

    expect(intersection.length).toEqual(0);
  });
});
