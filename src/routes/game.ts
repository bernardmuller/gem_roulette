// import * as readline from "readline";

const POOL = 200;

export enum Tiers {
	BLUE = "blue",
	PURPLE = "purple",
	PINK = "pink",
	RED = "red",
	GOLD = "gold",
}

type Probabilities = {
	id: number;
	tier: Tiers;
	propability: number;
};

export const propabilities: Probabilities[] = [
	{
		id: 1,
		tier: Tiers.BLUE,
		propability: 0.75,
	},
	{
		id: 2,
		tier: Tiers.PURPLE,
		propability: 0.15,
	},
	{
		id: 3,
		tier: Tiers.PINK,
		propability: 0.07,
	},
	{
		id: 4,
		tier: Tiers.RED,
		propability: 0.025,
	},
	{
		id: 5,
		tier: Tiers.GOLD,
		propability: 0.005,
	},
];

function shuffleArray(arr: Tiers[]): Tiers[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

export const propabilitiesChart = shuffleArray(
	propabilities
		.map((propability) => {
			let chart = new Array();
			for (let i = 0; i < propability.propability * POOL; i++) {
				chart.push(propability.tier);
			}
			return chart;
		})
		.flat()
);

export const roll = (): number => {
	const random = Math.floor(Math.random() * POOL);
	return random;
};

export const getSample = (index: number) => {
	if (index < 9) return propabilitiesChart.slice(0, 10);

	return propabilitiesChart.slice(index - 9, index + 1);
};
