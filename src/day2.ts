/**
 * Day 2
 * @module src/day2
 *
 * Evaluate strange reactor reports.
 */

/** Parse input text into an array of number arrays.*/
export function parse(data: string): number[][] {
  return data
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(" ")
        .map((val) => parseInt(val))
    );
}

/**
 * A report is safe if either all increasing or all decreasing and all
 * levels differ by 1-3.
 */
function isSafe(report: number[]): boolean {
  if (report.length < 2) {
    return true;
  }

  if (report[0] == report[1]) {
    return false;
  }

  const increasing = report[1] > report[0];

  for (let i = 0; i < report.length - 1; i++) {
    if (report[i + 1] > report[i] !== increasing) {
      return false;
    }
    const diff = Math.abs(report[i + 1] - report[i]);
    if (diff === 0 || diff > 3) {
      return false;
    }
  }
  return true;
}

/**
 * Returns true if a report [is safe]{@link isSafe} or if removing any
 * one value would render it safe.
 */
function isTolerantlySafe(report: number[]): boolean {
  if (isSafe(report)) {
    return true;
  }

  for (let i = 0; i < report.length; i++) {
    const fixed = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(fixed)) {
      return true;
    }
  }

  return false;
}

/**
 * How many reports are [safe]{@link isSafe}?
 *
 * @param reports An array of number arrays to be evaluated.
 * @returns Count of "safe" reports
 */
export function part1(reports: number[][]): number {
  return reports.reduce((acc, curr) => acc + (isSafe(curr) ? 1 : 0), 0);
}

/**
 * How many reports are ["tolerantly"]{@link isTolerantlySafe} safe (see above)?
 */
export function part2(reports: number[][]): number {
  return reports.reduce(
    (acc, curr) => acc + (isTolerantlySafe(curr) ? 1 : 0),
    0,
  );
}

/** Main Day 2 function */
export function day2(data: string) {
  const reports = parse(data);
  console.log(`
  Day 2:
    Part 1: ${part1(reports)}
    Part 2: ${part2(reports)}
  `);
}
