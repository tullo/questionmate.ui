<script>
  import Question from "./Question.svelte";
  import Recommendations from "./Recommendation.svelte";

  let url = 'https://dc-dev.nediscerecessa.de/dc/engine'
  let recommendations = null;

  function handleFetchRecommendations(event) {
    getRecommendations(event.detail.answers);
  }

  async function getRecommendations(answers) {
    const response = await fetch(url + "/recommendations?expand=proofpoints", {
      method: "POST",
      body: JSON.stringify(answers)
    });
    if (response.status === 200) {
      recommendations = await response.json();
    }
  }
</script>

<main>
  <h1>VW Drive Consultant</h1>
  <Question on:fetchRecommendations={handleFetchRecommendations} url={url} />
  <Recommendations recommendation={recommendations} />
</main>