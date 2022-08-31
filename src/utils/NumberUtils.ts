/**
 * 在数字前方补零，一般用于时间日期
 * @param target 被补零的数字
 * @param fillCount 需要补充到的位数
 */
export function fillZero(target: number, fillCount: number): string {
  let toNumb = target.toString()
  let zeroCount = fillCount - toNumb.length
  if(zeroCount <= 0) {
    return toNumb
  } else {
    return '0'.repeat(zeroCount) + toNumb
  }
}

export function convertTime(mileSeconds: number) {
  let seconds = Math.round(mileSeconds / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  seconds -= minutes * 60
  minutes -= hours * 60
  let text = ''
  if(hours !== 0) {
    text = `${hours}:`
  }
  text += `${fillZero(minutes, 2)}:${fillZero(seconds, 2)}`
  return {
    text,
    hours,
    minutes,
    seconds
  }

}
