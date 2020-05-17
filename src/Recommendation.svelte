<script>
  import Engines from "./Engines.svelte";
  export let recommendation = null;
</script>

<recommendation>
  {#if recommendation !== null}
    <Engines type={'Emotional'} engines={recommendation.emotional} />
    <Engines type={'Rational'} engines={recommendation.rational} />
  {/if}
</recommendation>
