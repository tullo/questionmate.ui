<script>
  import i18n from "./i18n.js";

  export let engines = null;
  export let type = "";
</script>

<style>
  h4 {
    text-decoration: underline;
  }
</style>

<engines>
  {#if engines !== null}
    <div>
      <div style="float:left;width:500px">
        <h4>{type}</h4>
        {#each engines as r}
          <h5>{i18n(r.type)}: {r.score}</h5>
          {#if r.proofpoints !== undefined}
            <ul>
              {#each r.proofpoints as pp}
                {#if pp.check}
                  <li style="list-style-type: disc; color: green">{i18n(pp.label)}</li>
                {:else}
                  <li style="list-style-type: circle; color: red">{i18n(pp.label)}</li>
                {/if}
              {/each}
            </ul>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
</engines>