<script>
  import Question from "./Question.svelte";
  import Evaluation from "./Evaluation.svelte";

  let url = 'http://localhost:8080'
  let evaluation = null;

  function handleFetchEvaluation(event) {
    getEvaluation(event.detail.answers);
  }

  async function getEvaluation(answers) {
    const response = await fetch(url + "/evaluations", {
      method: "POST",
      body: JSON.stringify(answers)
    });
    if (response.status === 200) {
      evaluation = await response.json();
    }
  }
</script>

<main>
  <h1>Questionmate - LegacyLab</h1>
  <Question on:fetchRecommendations={handleFetchEvaluation} url={url} />
  <Evaluation evaluation={Evaluation} />
</main>
