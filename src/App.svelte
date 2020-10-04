<script>
    import Question from "./Question.svelte";
    import Evaluation from "./Evaluation.svelte";

    let evaluation = null;
    let url = null;
    if (process.env.isProd) {
        url = 'http://95.217.222.60:8080/legacylab';
    } else {
        url = 'http://localhost:8080/legacylab';
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

<svelte:head>
    <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"
    />
</svelte:head>

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
