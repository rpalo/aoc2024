import { assertEquals } from "@std/assert";
import { parse, part1, part2 } from "../src/day10.ts";

const text = `
89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732
`;

Deno.test("Part 1", () => {
  assertEquals(part1(parse(text)), 36);
});

Deno.test("Part 2", () => {
  assertEquals(part2(parse(text)), 81);
});
