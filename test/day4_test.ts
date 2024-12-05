import { assertEquals } from "@std/assert";
import { parse, part1, part2 } from "../src/day4.ts";

const text = `
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
`;

Deno.test("Part 1", () => {
  assertEquals(18, part1(parse(text)));
});

Deno.test("Part 2", () => {
  assertEquals(9, part2(parse(text)));
});
