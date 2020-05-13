<script>
	import { onMount } from 'svelte';
	export let url;
	export let question;
	export let recommendations;
	let selected = 0;
	let answers = {
		"userId": "23",
		"tenant": "vw-rw",
		"answers": []
	}

	onMount(async function() {
		const response = await fetch(url + '/questions',
		{
			method: 'POST',
			body: JSON.stringify(answers)
		});
		question = await response.json();
	});
	
	async function nextQuestion(params) {
		const response = await fetch(url + '/questions',
		{
			method: 'POST',
			body: JSON.stringify(answers)
		});
		if (response.status === 200) {
			question = await response.json();		
		} else {
			getRecommendations()
		}
	}

	async function getRecommendations(params) {
		const response = await fetch(url + '/recommendations?expand=proofpoints',
		{
			method: 'POST',
			body: JSON.stringify(answers)
		});
		if (response.status === 200) {
			question = undefined
			recommendations = await response.json();		
		}
	}

	function handleSelect(event) {
		answers.answers.push({
			"questionId": question.questionId,
			"value": selected
		})
		nextQuestion()
		selected = 0
		question = undefined
	};
</script>

<question>	
	{#if question !== undefined}
		<h2>Frage: {question.label}</h2>
		<ul>
		{#each question.options as o}
			<li style="list-style-type: none">
				<label>
					<input type="radio" value={o.value} bind:group={selected}> {o.label}
				</label>
			</li>
		{/each}
		</ul>
		<button on:click|once={handleSelect}>
			Next
		</button>
	{/if}
	{#if recommendations !== undefined}
	<div>
		<div style="float:left;width:600px">
		<h2>Emotional</h2>
		{#each recommendations.emotional as r}
			<h3>{r.type}: {r.score}</h3>
			{#if r.proofpoints !== undefined}
				<ol>
					{#each r.proofpoints as pp}
					<li>
						{pp.label}
					</li>
					{/each}
				</ol>
			{/if}
		{/each}
		</div>
		<div style="float:left;width:600px">
		<h2>Rational</h2>
		{#each recommendations.rational as r}
			<h3>{r.type}: {r.score}</h3>
			{#if r.proofpoints !== undefined}
				<ol>
					{#each r.proofpoints as pp}
					<li>
						{pp.label}
					</li>
					{/each}
				</ol>
			{/if}
		{/each}
		</div>
	</div>
	{/if}
</question>