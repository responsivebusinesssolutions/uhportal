export class Utils {
  static flattenObject = ((isArray, wrapped) => {
    return table => {
      return reduce('', {}, table);
    };

    function reduce(path, accumulator, table) {
      if (isArray(table)) {
        const length = table.length;

        if (length) {
          let index = 0;

          while (index < length) {
            const prop = path + '[' + index + ']';
            const itm = table[index++];

            if (wrapped(itm) !== itm) {
              accumulator[prop] = itm;
            } else {
              reduce(prop, accumulator, itm);
            }
          }
        } else {
          accumulator[path] = table;
        }
      } else {
        let isEmpty = true;

        if (path) {
          for (let prop of Object.keys(table)) {
            const itm = table[prop];

            prop = path + '.' + prop;
            isEmpty = false;

            if (wrapped(itm) !== itm) {
              accumulator[prop] = itm;
            } else {
              reduce(prop, accumulator, itm);
            }
          }
        } else {
          for (const prop of Object.keys(table)) {
            const itm = table[prop];
            isEmpty = false;

            if (wrapped(itm) !== itm) {
              accumulator[prop] = itm;
            } else {
              reduce(prop, accumulator, itm);
            }
          }
        }

        if (isEmpty) {
          accumulator[path] = table;
        }
      }

      return accumulator;
    }
  })(Array.isArray, Object);

  static arraysIntersect(a: Array<any>, b: Array<any>): Array<any> {
    return a.filter(x => b.includes(x));
  }
}
