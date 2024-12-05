import { assertEquals } from "@std/assert";
import { parse, part1, part2 } from "../src/day5.ts";

const simpleText = `
1|2
3|4
55|66

1,2,3,4
5,6,7
8,9
`;

const text = `
47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47
`;

Deno.test("Parse", () => {
  assertEquals(parse(simpleText), {
    rules: [
      [1, 2],
      [3, 4],
      [55, 66],
    ],
    updates: [
      [1, 2, 3, 4],
      [5, 6, 7],
      [8, 9],
    ],
  });
});

Deno.test("Part 1", () => {
  assertEquals(part1(parse(text)), 143);
});

Deno.test("Part 2", () => {
  assertEquals(part2(parse(text)), 123);
});
