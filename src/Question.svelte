<script>
  import { onMount } from "svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let url = "";
  export let question = null;
  let choice = 0;
  let answers = {
    userId: "23",
    tenant: "vw-rw",
    answers: []
  };

  onMount(async function() {
    const response = await fetch(url + "/questions", {
      method: "POST",
      body: JSON.stringify(answers)
    });
    if (response.status === 200) {
      question = await response.json();
    }
  });

  async function nextQuestion(params) {
    const response = await fetch(url + "/questions", {
      method: "POST",
      body: JSON.stringify(answers)
    });
    if (response.status === 200) {
      question = await response.json();
    } else {
      dispatch("fetchRecommendations", {
        answers: answers
      });
    }
  }

  function handleNext(event) {
    answers.answers.push({
      questionId: question.questionId,
      value: choice
    });
    nextQuestion();
    choice = 0;
    question = null;
  }
</script>

<question>
  {#if question !== null}
    <h2>Frage: {question.label}</h2>
    <ul>
      {#each question.options as o}
        <li style="list-style-type: none">
          <label>
            <input type="radio" value={o.value} bind:group={choice} />
            {o.label}
          </label>
        </li>
      {/each}
    </ul>
    <button on:click|once={handleNext}>Next</button>
  {/if}
</question>
