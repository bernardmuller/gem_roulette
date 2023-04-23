<script>
	export let scores = [
		{ name: "Player 1", score: 10 },
		{ name: "Player 2", score: 5 },
		{ name: "Player 3", score: 20 },
		{ name: "Player 4", score: 15 },
		{ name: "Player 5", score: 8 },
	];
</script>

<div class="scoreboard">
	<table>
		<thead>
			<tr>
				<th>Color</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
			{#each scores as score}
				<tr>
					<td class={score.name}>{score.name}</td>
					<td class={score.name}>{score.score}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.scoreboard {
		background-color: #2b2b2b;
		color: #fff;
		font-family: Arial, sans-serif;
		border-radius: 10px;
		overflow: hidden;
	}
	.scoreboard table {
		width: 100%;
		border-collapse: collapse;
	}
	.scoreboard th,
	.scoreboard td {
		padding: 10px;
		text-align: center;
	}
	.scoreboard th {
		background-color: #262626;
		border-bottom: 2px solid #333;
	}
	.scoreboard tr:nth-child(even) {
		background-color: #3c3c3c;
	}
	.scoreboard tr:nth-child(odd) {
		background-color: #333;
	}

	.red {
		color: #ff5959;
	}
	.blue {
		color: #58b9ff;
	}
	.pink {
		color: #ff59ff;
	}
	.gold {
		color: #ffe359;
	}
	.purple {
		color: #9059ff;
	}
</style>
