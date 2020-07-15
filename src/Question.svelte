<script>
    import {onMount} from "svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let url = "";
    export let question = null;
    let choice = 0;
    let descVisible = "is-hidden";
    let answers = {
        answers: []
    };

    onMount(async function () {
        const response = await fetch(url + "/questions", {
            method: "POST",
            body: JSON.stringify(answers)
        });
        if (response.status === 200) {
            question = await response.json();
        }
    });

    async function nextQuestion() {
        const response = await fetch(url + "/questions", {
            method: "POST",
            body: JSON.stringify(answers)
        });
        if (response.status === 200) {
            question = await response.json();
        } else {
            dispatch("fetchEvaluation", {
                answers: answers
            });
        }
    }

    function handleNext(event) {
        answers.answers.push({
            question_id: question.id,
            value: choice
        });
        nextQuestion();
        choice = 0;
        question = null;
        descVisible = false;
    }

    function toggleDescVisible() {
        descVisible = !descVisible
    }
</script>

<question class="content">
    {#if question !== null}
        <h3 class="title is-6">{question.text}</h3>
        {#if question.desc !== null && question.desc !== ""}
        <!-- svelte-ignore a11y-missing-attribute -->
            <a hidden='{!descVisible}' on:click={toggleDescVisible}>Erklärung der Frage...</a>
            {#if !descVisible}
                <article class="message">
                    <div class="message-header">
                        Folgendes steckt hinter der Frage
                        <button class="delete" aria-label="delete" on:click={toggleDescVisible}></button>
                    </div>
                    <div class="message-body">
                        {question.desc}
                    </div>
                </article>
            {/if}
                <!-- svelte-ignore a11y-missing-attribute -->
        {/if}
        <ul>
            {#each question.options as o}
                <li style="list-style-type: none">
                    <label>
                        <input type="radio" value={o.value} bind:group={choice}/>
                        {o.text}
                    </label>
                </li>
            {/each}
        </ul>
        <button on:click|once={handleNext} disabled='{choice === 0}'>Next</button>
    {/if}
</question>
