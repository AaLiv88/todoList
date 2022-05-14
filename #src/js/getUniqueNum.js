export function getUniqueNum(length) {
  let used = []

  return function getNum() {
    const num = `${Math.random().toFixed(length)}`.slice(3, length + 2);

    if (used.includes(num)) {
      getNum();
    } else {
      used.push(num);
      return num;
    }

  }
}