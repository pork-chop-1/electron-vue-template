export function generateSequenceArray(start: number, end: number) {
  const res = new Array(end - start).fill(0);
  return res.map((item, index) => start + index);
}
// Fisher–Yates shuffle 算法生成乱序数组
export function generateShuffledArray(start: number, end: number) {
  const res = generateSequenceArray(start, end);
  for (let i = start + 1; i < end - start; i += 1) {
    const random = start + Math.floor(Math.random() * (i + 1));
    [res[i], res[random]] = [res[random], res[i]];
  }
  return res;
}