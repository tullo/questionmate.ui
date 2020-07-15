<script>
    import {onMount} from "svelte";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let url = "";
    export let question = null;
    let choice = 0;
    let descVisible = false;
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

<question>
    {#if question !== null}
        <h3>{question.text}</h3>
        {#if question.desc !== null && question.desc !== ""}
            <span hidden='{descVisible}' on:click={toggleDescVisible}>[Mehr]</span>
            <span hidden='{!descVisible}' on:click={toggleDescVisible}>[Schließen]</span>
            <p hidden='{!descVisible}'>
                {question.desc}
            </p>
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
