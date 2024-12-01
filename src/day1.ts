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

export function part1(left: number[], right: number[]): number {
  return left
    .map((l, i) => Math.abs(l - right[i]))
    .reduce((acc, curr) => acc + curr, 0);
}

export function part2(left: number[], right: number[]): number {
  const counts: Map<number, number> = new Map();

  right.forEach((n) => {
    counts.set(n, (counts.get(n) || 0) + 1);
  });
  return left
    .map((n) => n * (counts.get(n) || 0))
    .reduce((acc, n) => acc + n, 0);
}

export function day1(text: string) {
  const [left, right] = parse(text);
  console.log(`
  Day 1:
    Part 1: ${part1(left, right)}
    Part 2: ${part2(left, right)}
  `);
}
