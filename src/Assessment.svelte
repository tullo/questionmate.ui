<script>
    import Targets from "./Targets.svelte";
    export let evaluation = null;

</script>

<assessment>
    {#if evaluation !== null}
        <h3 class="title is-3">Your Evaluation</h3>
        <Targets targets={evaluation.targets}/>
        <div class="content">
            <p class="pt-2">
                <button onClick="window.location.reload();">Restart Survey</button>
            </p>
        </div>
    {/if}
</assessment>
