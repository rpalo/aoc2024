aoc2024: src/main.ts
	deno compile --output $@ --allow-read src/main.ts

.PHONY: test

test:
	deno test
