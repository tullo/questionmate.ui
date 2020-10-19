<script>
    import Targets from "./Targets.svelte";
    export let evaluation = null;
</script>

<assessment>
    {#if evaluation !== null}
        <h3 class="title is-4">Auswertung</h3>
        <Targets targets={evaluation.targets}/>
        <div class="content">
            <p class="pt-4">
                <button onClick="window.location.reload();">Umfrage neu starten</button>
            </p>
        </div>
    {/if}
</assessment>
