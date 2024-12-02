aoc2024: src/main.ts
	deno compile --output $@ --allow-read src/main.ts

.PHONY: test run

test:
	deno test

run:
	deno -A src/main.ts
