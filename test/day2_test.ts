import { assertEquals } from "@std/assert";
import { parse, part1, part2 } from "../src/day2.ts";

const text = `
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
`;

Deno.test("Parse", () => {
  assertEquals(
    parse(text),
    [
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ],
  );
});

Deno.test("Part 1", () => {
  assertEquals(part1(parse(text)), 2);
});

Deno.test("Part 2", () => {
  assertEquals(part2(parse(text)), 4);
});
