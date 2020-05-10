<script>
	import { onMount } from 'svelte';
	export let url;
	export let question;
	let selected = 0;
	let answers = {
		"userId": "23",
		"tenant": "vw-rw",
		"answers": []
	}

	onMount(async function() {
		const response = await fetch(url,
		{
			method: 'POST',
			body: JSON.stringify(answers)
		});
		question = await response.json();
	});
	
	async function nextQuestion(params) {
		const response = await fetch(url,
		{
			method: 'POST',
			body: JSON.stringify(answers)
		});
		if (response.status === 200) {
			question = await response.json();		
		} else {
			alert("Your recommendations .")
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
</question>