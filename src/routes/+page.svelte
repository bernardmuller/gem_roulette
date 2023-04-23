<script lang="ts">
	import { browser } from "$app/environment";
	import { get, writable } from "svelte/store";
	import redGem from "../red_gem.svg";
	import blueGem from "../blue_gem.svg";
	import goldGem from "../gold_gem.svg";
	import pinkGem from "../pink_gem.svg";
	import purpleGem from "../purple_gem.svg";

	import { roll, getSample, Tiers } from "./game";
	import Scoreboard from "./Scoreboard.svelte";
	import { onMount } from "svelte";

	let sample: Tiers[] = [];
	let sampleGems: any = [];
	let currentIdx = 0;
	let isSpinning = false;
	let rotation = 0;

	const loadGemScore = () => {
		if (!browser) return;
		let gemScore = localStorage.get("gem_score");
		if (!gemScore) {
			localStorage.set("gem_score", [
				{ name: Tiers.BLUE, score: 0 },
				{ name: Tiers.PURPLE, score: 0 },
				{ name: Tiers.PINK, score: 0 },
				{ name: Tiers.RED, score: 0 },
				{ name: Tiers.GOLD, score: 0 },
			]);
		}
		return gemScore;
	};

	let score = [
		{ name: Tiers.BLUE, score: 0 },
		{ name: Tiers.PURPLE, score: 0 },
		{ name: Tiers.PINK, score: 0 },
		{ name: Tiers.RED, score: 0 },
		{ name: Tiers.GOLD, score: 0 },
	];

	onMount(() => {
		// loadGemScore();
	});

	const loadGemColorScore = (gem: Tiers) => {
		if (!browser) return;
		const color = localStorage
			.get("gem_score")
			.filter(
				(g: { name: string; score: number }) => g.name === Tiers.BLUE
			)[0]
			.score.then((s: number) => s);
		return color;
	};

	// let score = [
	// 	{
	// 		name: Tiers.BLUE,
	// 		score: loadGemColorScore(Tiers.BLUE) || 0,
	// 	},
	// 	{
	// 		name: Tiers.PURPLE,
	// 		score: loadGemColorScore(Tiers.PURPLE) || 0,
	// 	},
	// 	{ name: Tiers.PINK, score: loadGemColorScore(Tiers.PINK) || 0 },
	// 	{ name: Tiers.RED, score: loadGemColorScore(Tiers.RED) || 0 },
	// 	{ name: Tiers.GOLD, score: loadGemColorScore(Tiers.GOLD) || 0 },
	// ];

	function spin() {
		currentIdx = Math.floor(Math.random() * sample.length);
	}

	const addScore = () => {
		if (!browser) return;
		switch (sample[currentIdx]) {
			case Tiers.RED:
				score.map((s) =>
					s.name === Tiers.RED ? (s.score += 1) : s.score
				);

				score = score;

				break;
			case Tiers.BLUE:
				score.filter((s) =>
					s.name === Tiers.BLUE ? (s.score += 1) : s.score
				);

				score = score;

				break;
			case Tiers.GOLD:
				score.filter((s) =>
					s.name === Tiers.GOLD ? (s.score += 1) : s.score
				);

				score = score;

				break;
			case Tiers.PINK:
				score.filter((s) =>
					s.name === Tiers.PINK ? (s.score += 1) : s.score
				);

				score = score;

				break;
			case Tiers.PURPLE:
				score.filter((s) =>
					s.name === Tiers.PURPLE ? (s.score += 1) : s.score
				);

				score = score;

				break;
		}
	};

	const handleClick = () => {
		if (!browser) return;
		isSpinning = true;
		const random = roll();
		sample = getSample(random);

		sampleGems = sample.map((tier) => {
			switch (tier) {
				case Tiers.RED:
					return redGem;
				case Tiers.BLUE:
					return blueGem;
				case Tiers.GOLD:
					return goldGem;
				case Tiers.PINK:
					return pinkGem;
				case Tiers.PURPLE:
					return purpleGem;
			}
		});

		const interval = setInterval(() => {
			spin();
		}, 200);

		setTimeout(() => {
			clearInterval(interval);
			currentIdx = sample.length - 1;

			addScore();

			isSpinning = false;
		}, 3000);
	};

	setInterval(function () {
		if (!isSpinning) return;
		const deg = Math.floor(Math.random() * 360);
		rotation = deg;
	}, 200);
</script>

<section class="spinner-section">
	<h1>Gem Roulette</h1>
	<div class="container">
		{#if !isSpinning && sample.length > 0}
			<p class="gem-heading">{sample[currentIdx].toUpperCase()}</p>
		{:else}
			<p class="gem-heading" />
		{/if}
	</div>
	<div class="container">
		{#if sample.length > 0}
			<div
				style="display: flex; justify-content: center; align-items:center; transform: rotate({isSpinning &&
					rotation}deg); "
			>
				<img
					id="myDiv"
					src={sampleGems[currentIdx]}
					alt="gem"
					class="gem {!isSpinning ? 'pulse' : 'fast-pulse'}"
				/>
			</div>
		{:else}
			<p style="gem-heading">Press the button to get a gem!</p>
		{/if}
	</div>
	<button on:click={handleClick} disabled={isSpinning} class="spin-button"
		>Spin</button
	>
</section>

<Scoreboard scores={score} />

<style>
	.container {
		min-height: 3rem;
	}

	.gem-heading {
		font-size: 16px;
		font-weight: semi-bold;
		margin: 0;
	}

	.spin-button {
		width: 100px;
		height: 50px;
		border: 1px solid white;
		border-radius: 5px;
		background-color: #1e1e1e;
		color: white;
		font-size: 16px;
		font-weight: semi-bold;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		margin-top: 4rem;
	}

	.spinner-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 400px;
		padding-bottom: 2rem;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	.gem {
		width: 150px;
		height: 150px;
	}

	.spin {
		animation: spin 3s linear infinite;
	}

	.pulse {
		animation: pulse 1.5s infinite;
	}

	.fast-pulse {
		animation: pulse 200ms infinite;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
		}

		50% {
			transform: scale(1.1);
		}

		100% {
			transform: scale(1);
		}
	}
</style>
