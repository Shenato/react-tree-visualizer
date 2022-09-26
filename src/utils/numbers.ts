export const precisionRound = (number, precision) => {
  if (Number.isNaN(Number(number))) return number;
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

export const returnEven = num => (num !== 0 ? num - 1 * (num % 2) : 0);
export const returnOdd = num => (num !== 0 ? num - 1 + 1 * (num % 2) : 0);

export function numArrayComparison(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
