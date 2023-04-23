<script>
	import "./styles.css";
	import FaGithub from "svelte-icons/fa/FaGithub.svelte";
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<a
			href="https://github.com/bernardmuller/gem_roulette"
			class="github-link"
			target="_blank"
		>
			<FaGithub size={30} color="white" />
		</a>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #171717;
		color: white;
	}

	.github-link {
		display: flex;
		justify-content: center;
		align-items: center;
		color: white;
		max-height: 2rem;
		max-width: 2rem;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 36rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
