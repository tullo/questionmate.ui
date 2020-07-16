<script>
    import Question from "./Question.svelte";
    import Evaluation from "./Evaluation.svelte";

    let evaluation = null;
    let url = null;
    if (process.env.isProd) {
        url = 'http://95.217.222.60:8080';
    } else {
        url = 'http://localhost:8080';
    }

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

<main class="section">
    <h1 class="title is-1">Questionmate - LegacyLab</h1>
    <Question on:fetchEvaluation={handleFetchEvaluation} url={url}/>
    <Evaluation evaluation={evaluation}/>
    <div class="content">
        <p class="pt-2">
            API Base URL: {url}
        </p>
    </div>
</main>
