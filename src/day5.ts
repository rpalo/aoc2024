/** Holds the fully parsed data including precedence rules and all updates. */
type State = {
  rules: [number, number][];
  updates: number[][];
};

/** Parse the input text into a State object */
export function parse(data: string): State {
  const [ruleText, updateText] = data.trim().split("\n\n");
  return {
    rules: ruleText.split("\n").map((line) =>
      line.split("|").map((d) => parseInt(d)) as [number, number]
    ),
    updates: updateText.split("\n").map((line) =>
      line.split(",").map((d) => parseInt(d))
    ),
  };
}

/**
 * If an update breaks one of the rules, return the indices of the items breaking the rule.
 * Otherwise, return null.
 */
function findRuleBreak(
  rules: [number, number][],
  update: number[],
): [number, number] | null {
  const present = new Set(update);
  for (const rule of rules) {
    if (!present.has(rule[0]) || !present.has(rule[1])) continue;

    const left = update.indexOf(rule[0]);
    const right = update.indexOf(rule[1]);

    if (left > right) return [left, right];
  }
  return null;
}

/** Return the middle value of an odd-length array */
function middle(nums: number[]): number {
  return nums[Math.floor(nums.length / 2)];
}

/** Sum middle values for all updates that pass all rules. */
export function part1(state: State): number {
  return state.updates.reduce(
    (acc, curr) =>
      acc + (findRuleBreak(state.rules, curr) === null ? middle(curr) : 0),
    0,
  );
}

/**
 * Iteratively fix an update that breaks rules by swapping the items that break a rule
 * until the update breaks no more rules.
 */
function fix(rules: [number, number][], update: number[]) {
  while (true) {
    const brokenRule = findRuleBreak(rules, update);

    if (brokenRule === null) {
      return;
    }
    const [l, r] = brokenRule;

    [update[l], update[r]] = [update[r], update[l]];
  }
}

/** Sum the middle values of all broken updates *after* you fix them. */
export function part2(state: State): number {
  return state.updates.reduce(
    (acc, curr) => {
      if (findRuleBreak(state.rules, curr) === null) return acc;
      fix(state.rules, curr);
      return acc + middle(curr);
    },
    0,
  );
}

/** Main Day 5 function */
export function day5(data: string) {
  const state = parse(data);
  console.log(`
  Day 5:
    Part 1: ${part1(state)}
    Part 2: ${part2(state)}
  `);
}
