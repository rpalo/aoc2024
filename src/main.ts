import { parseArgs } from "jsr:@std/cli/parse-args";
import { day1 } from "./day1.ts";
import { day2 } from "./day2.ts";
import { day3 } from "./day3.ts";
import { day4 } from "./day4.ts";
import { day5 } from "./day5.ts";
import { day6 } from "./day6.ts";
import { day7 } from "./day7.ts";
import { day8 } from "./day8.ts";
import { day9 } from "./day9.ts";
import { day10 } from "./day10.ts";

const DAYS = [
  day1,
  day2,
  day3,
  day4,
  day5,
  day6,
  day7,
  day8,
  day9,
  day10,
];

function runDay(day: number) {
  if (day < 1 || DAYS.length < day) {
    console.log(`Day ${day} not available.`);
    Deno.exit(1);
  }
  const start = performance.now();
  const text = Deno.readTextFileSync(`data/day${day}.txt`);
  DAYS[day - 1](text);
  console.log(`Elapsed: ${performance.now() - start}`);
}

if (import.meta.main) {
  const flags = parseArgs(Deno.args, {
    string: ["day"],
    boolean: ["help"],
  });

  if (flags.help) {
    console.log("Usage: deno src/main.ts [--day DAY]");
    Deno.exit(0);
  }

  if (!flags.day) {
    DAYS.forEach((_, i) => runDay(i + 1));
    Deno.exit(0);
  }

  const day = parseInt(flags.day);

  if (Number.isNaN(day)) {
    console.log(`${flags.day} is not a number.`);
    Deno.exit(1);
  }

  runDay(day);
}
