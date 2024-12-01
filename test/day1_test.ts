import { assertEquals } from "jsr:@std/assert";

import { parse, part1, part2 } from "../src/day1.ts";

const text = `
3   4
4   3
2   5
1   3
3   9
3   3
`;

Deno.test("Parse", () => {
  assertEquals(parse(text), [[1, 2, 3, 3, 3, 4], [3, 3, 3, 4, 5, 9]]);
});

Deno.test("Part 1", () => {
  assertEquals(part1(...parse(text)), 11);
});

Deno.test("Part 2", () => {
  assertEquals(part2(...parse(text)), 31);
});
