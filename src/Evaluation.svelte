<script>
    import Targets from "./Targets.svelte";

    export let evaluation = null;
</script>

<assessment>
    {#if evaluation !== null}
        <h3 class="title is-3">Your Evaluation</h3>
        <Targets targets={evaluation.targets}/>
    {/if}
</assessment>
