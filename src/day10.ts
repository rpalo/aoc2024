/**
 * Day 10
 * @module src/day10
 *
 * Trace paths on a grid from 0 to 9.
 */

/** Parse the input string into a 2D array of numbers */
export function parse(data: string): number[][] {
  return data.trim().split("\n").map((line) => (
    line.split("").map((c) => parseInt(c))
  ));
}

/**
 * Generate a string key for a set for a [digit, digit] pair
 * that is a stringified x,y pair.
 */
function key(pair: [number, number]): string {
  return `${pair[0]},${pair[1]}`;
}

/**
 * Starting at the starting point, see how many 9's can be reached.
 *
 * Each 9 will only be counted once.
 */
function bfs(map: number[][], start: [number, number]): number {
  let trails = 0;
  const seen = new Set();
  const queue: [number, number][] = [start];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (map[current[1]][current[0]] === 9) {
      trails++;
      seen.add(key(current));
      continue;
    }

    for (const offset of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const newX = offset[0] + current[0];
      const newY = offset[1] + current[1];

      if (
        newX < 0 || newX >= map[0].length ||
        newY < 0 || newY >= map.length ||
        map[newY][newX] !== map[current[1]][current[0]] + 1
      ) {
        continue;
      }
      if (seen.has(key([newX, newY]))) continue;
      seen.add(key([newX, newY]));
      queue.push([newX, newY]);
    }
  }
  return trails;
}

/** Add up all the 9's that can be reached from all the 0's */
export function part1(map: number[][]): number {
  let total = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 0) total += bfs(map, [col, row]);
    }
  }
  return total;
}

/** Add up all the different ways you can get to all the 9's from start. */
function distinctBfs(map: number[][], start: [number, number]): number {
  let trails = 0;

  const queue: [number, number][][] = [[start]];
  while (queue.length > 0) {
    const current = queue.shift()!;
    const head = current[current.length - 1];

    if (map[head[1]][head[0]] === 9) {
      trails++;
      continue;
    }

    for (const offset of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const [newX, newY] = [head[0] + offset[0], head[1] + offset[1]];
      if (
        newX < 0 || newX >= map[0].length ||
        newY < 0 || newY >= map.length ||
        map[newY][newX] !== map[head[1]][head[0]] + 1
      ) {
        continue;
      }
      // Don't revisit any spots this path has already seen.
      if (current.some((el) => el[0] === newX && el[1] === newY)) continue;
      queue.push([...current, [newX, newY]]);
    }
  }

  return trails;
}

/** Add up the total number of paths from 0 to 9 that can be made */
export function part2(map: number[][]): number {
  let total = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 0) total += distinctBfs(map, [col, row]);
    }
  }
  return total;
}

/** Main Day 10 function */
export function day10(data: string) {
  const map = parse(data);
  console.log(`
  Day 10:
    Part 1: ${part1(map)}
    Part 2: ${part2(map)}
  `);
}
