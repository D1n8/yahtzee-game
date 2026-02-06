export function getArrSum(arr: number[]) {
  return arr.reduce((acc, curr) => {
    return acc + curr
  }, 0)
}