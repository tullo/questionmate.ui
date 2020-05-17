<script>
  export let recommendations = null;
</script>

{#if recommendations !== null}
  <div>
    <div style="float:left;width:500px">
      <h2>Emotional</h2>
      {#each recommendations.emotional as r}
        <h3>{r.type}: {r.score}</h3>
        {#if r.proofpoints !== undefined}
          <ul>
            {#each r.proofpoints as pp}
              {#if pp.check}
                <li style="list-style-type: disc">{pp.label}</li>
              {:else}
                <li style="list-style-type: circle">{pp.label}</li>
              {/if}
            {/each}
          </ul>
        {/if}
      {/each}
    </div>
    <div style="float:left;width:500px">
      <h2>Rational</h2>
      {#each recommendations.rational as r}
        <h3>{r.type}: {r.score}</h3>
        {#if r.proofpoints !== undefined}
          <ul>
            {#each r.proofpoints as pp}
              {#if pp.check}
                <li style="list-style-type: disc">{pp.label}</li>
              {:else}
                <li style="list-style-type: circle">{pp.label}</li>
              {/if}
            {/each}
          </ul>
        {/if}
      {/each}
    </div>
  </div>
{/if}
