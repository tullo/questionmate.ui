<script>
    import Targets from "./Targets.svelte";

    export let evaluation = null;
</script>

<assessment>
    {#if evaluation !== null}
        <h2>Your Evaluation</h2>
        <Targets targets={evaluation.targets}/>
    {/if}
</assessment>
