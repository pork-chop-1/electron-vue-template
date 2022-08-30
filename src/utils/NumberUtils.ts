export function fillZero(target: number, zeroCount: number): string {
  let toNumb = target.toString()
  let fillCount = zeroCount - toNumb.length
  if(fillCount <= 0) {
    return toNumb
  } else {
    return ' '.repeat(fillCount) + toNumb
  }
}