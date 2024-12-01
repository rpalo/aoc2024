/**
 * Day 1
 * @module src/day1
 *
 * Compare two lists of found "location IDs" and score their similarities/differences.
 */

/** Parse the input text into two sorted arrays of integers */
export function parse(text: string): [number[], number[]] {
  const left: number[] = [];
  const right: number[] = [];
  text
    .trim()
    .split("\n")
    .forEach((line) => {
      const [l, r] = line.trim().split("   ").map((i) => parseInt(i));
      left.push(l);
      right.push(r);
    });
  left.sort();
  right.sort();
  return [left, right];
}

/** Part 1: Calculate the difference between the items in the left and right arrays */
export function part1(left: number[], right: number[]): number {
  return left
    .map((l, i) => Math.abs(l - right[i]))
    .reduce((acc, curr) => acc + curr, 0);
}

/** Multiply each item in left by the number of times it appears in right */
export function part2(left: number[], right: number[]): number {
  const counts: Map<number, number> = new Map();

  right.forEach((n) => {
    counts.set(n, (counts.get(n) || 0) + 1);
  });
  return left
    .map((n) => n * (counts.get(n) || 0))
    .reduce((acc, n) => acc + n, 0);
}

/** Run both parts of day 1 and output. */
export function day1(text: string) {
  const [left, right] = parse(text);
  console.log(`
  Day 1:
    Part 1: ${part1(left, right)}
    Part 2: ${part2(left, right)}
  `);
}
