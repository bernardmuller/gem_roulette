import { writable, type Writable } from "svelte/store";
import { Tiers } from "../routes/game";
import { persistStore } from "./persistStore";

type Score = {
	name: Tiers;
	score: number;
};

export const score: Writable<Score[]> = writable([
	{ name: Tiers.BLUE, score: 0 },
	{ name: Tiers.PURPLE, score: 0 },
	{ name: Tiers.PINK, score: 0 },
	{ name: Tiers.RED, score: 0 },
	{ name: Tiers.GOLD, score: 0 },
]);

export const store = persistStore("gem_score", score);
