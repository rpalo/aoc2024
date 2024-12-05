/** Parse the input string into a list of lines with a 1-char '.' buffer on all sides. */
export function parse(data: string): string[] {
  const lines = data.trim().split("\n");
  const width = lines[0].length;
  return [".".repeat(width + 2)].concat(
    lines.map((line) => "." + line + "."),
  ).concat([".".repeat(width + 2)]);
}

/** Returns the number of XMAS-es found starting at row, col. */
function countXmas(data: string[], row: number, col: number): number {
  let total = 0;

  if (data[row][col] !== "X") {
    return total;
  }

  for (const x of [-1, 0, 1]) {
    for (const y of [-1, 0, 1]) {
      if (x === 0 && y === 0) continue;
      if (isMas(data, row, col, [x, y])) total++;
    }
  }
  return total;
}

/** Returns true if the chars moving in `direction` spell MAS, assuming an X at row, col. */
function isMas(
  data: string[],
  row: number,
  col: number,
  direction: [number, number],
): boolean {
  if (data[row + direction[0]][col + direction[1]] !== "M") return false;
  if (data[row + 2 * direction[0]][col + 2 * direction[1]] !== "A") {
    return false;
  }
  if (data[row + 3 * direction[0]][col + 3 * direction[1]] !== "S") {
    return false;
  }
  return true;
}

/** Count number of XMAS-es horizontal, vertical, or diagonal. */
export function part1(data: string[]): number {
  return data.reduce((acc, line, row) => {
    const indices = line.matchAll(/X/g).map((m) => m.index);
    return acc +
      indices.reduce(
        (line_acc, index) => line_acc + countXmas(data, row, index),
        0,
      );
  }, 0);
}

/** Count number of locations two MAS-es cross each other diagonally. */
export function part2(data: string[]): number {
  const mases = new Map<string, number>();
  data.forEach((line, row) => {
    const indices = line.matchAll(/M/g).map((m) => m.index);

    indices.forEach((index) => {
      for (const pair of [[-1, -1], [-1, 1], [1, -1], [1, 1]]) {
        const [x, y] = pair;
        if (isMas(data, row - y, index - x, [y, x])) {
          const aLoc = `${row + y},${index + x}`;
          mases.set(aLoc, (mases.get(aLoc) || 0) + 1);
        }
      }
    });
  });

  return mases.values().reduce((acc, curr) => acc + (curr === 2 ? 1 : 0), 0);
}

export function day4(data: string) {
  const grid = parse(data);
  console.log(`
  Day 4:
    Part 1: ${part1(grid)}
    Part 2: ${part2(grid)}
  `);
}
