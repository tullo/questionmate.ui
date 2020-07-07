<script>
  import Targets from "./Targets.svelte";
  export let evaluation = null;
</script>

<assessment>
  <h2>Your Evaluation</h2>
  {#if evaluation !== null}
    <Targets targets={evaluation.targets} />
  {/if}
</assessment>
