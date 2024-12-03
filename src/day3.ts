/**
 * Day 3
 * @module src/day3
 *
 * Parse instructions out of corrupted characters
 */

/**
 * sum the results of any mul(X,Y) instructions where the
 * instruction matches that pattern exactly and X and Y are 1-3
 * digit numbers.
 */
export function part1(data: string): number {
  const matches = data.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
  return matches
    .map((match) => parseInt(match[1]) * parseInt(match[2]))
    .reduce((acc, curr) => acc + curr, 0);
}

/**
 * Perform the same summing as part 1, but only between regions
 * of 'do()' and 'don't()', ignoring those between 'don't()'
 * and 'do()'.  Assume the string starts with an implicit 'do()'.
 *
 * Chomp the input segment by segment, processing the do's and
 * then throwing out the following dont's.
 */
export function part2(data: string): number {
  let total = 0;
  let pending = data;
  while (pending) {
    let stop = pending.search(/don't\(\)/);

    if (stop === -1) {
      stop = pending.length;
    }
    total += part1(pending.slice(0, stop));
    const start = pending.slice(stop + 7).search(/do\(\)/);

    if (start === -1) {
      break;
    }
    // new start is 0 + index of don't() + len(don't())
    // + index of do() after the don't() + len(do())
    pending = pending.slice(stop + 7 + start + 4);
  }
  return total;
}

/** Main Day 3 function */
export function day3(data: string) {
  console.log(`
  Day 3:
    Part 1: ${part1(data)}
    Part 2: ${part2(data)}
  `);
}
