<script>
    import {onMount} from "svelte";
    import Question from "./Question.svelte";
    import Assessment from "./Assessment.svelte";

    let evaluation = null;
    let questionnaire = null;
    let url = null;
    if (process.env.isProd) {
        url = 'http://95.217.222.60:8080/coma';
    } else {
        url = 'http://localhost:8080/coma';
    }

    onMount(async function () {
        const response = await fetch(url, {
            method: "GET"
        });
        if (response.status === 200) {
            questionnaire = await response.json();
        }
    });

    function handleFetchEvaluation(event) {
        getEvaluation(event.detail.answers);
    }

    async function getEvaluation(answers) {
        const response = await fetch(url + "/assessment", {
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
    <h1 class="title is-1">Software-Coma-Scale</h1>
    {#if questionnaire !== null}
    <p class="mb-5">
        {questionnaire.abstract}
    </p>
    {/if}
    <Question on:fetchEvaluation={handleFetchEvaluation} url={url}/>
    <Assessment evaluation={evaluation} url={url}/>
    <hr>
    <div class="content">
        <p class="pt-2">
            API Base URL: {url}
        </p>
        <p class="pt-2">
            This survey is driven by <a href="https://github.com/tullo/questionmate">Questionmate</a>
        </p>
    </div>
</main>
