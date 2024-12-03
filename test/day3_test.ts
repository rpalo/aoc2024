import { assertEquals } from "@std/assert";
import { part1, part2 } from "../src/day3.ts";

const text =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

Deno.test("Part 1", () => {
  assertEquals(part1(text), 161);
});

const part2Text =
  "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";

Deno.test("Part 2", () => {
  assertEquals(part2(part2Text), 48);
});
