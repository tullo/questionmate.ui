<script>
    export let targets = null;
</script>

<style>
    h4 {
        text-decoration: underline;
    }
</style>

<targets>
    {#if targets !== null}
        <div>
            <div style="float:left;width:500px">
                {#each targets as t}
                    <h5>{t.text}: {t.score}</h5>
                {/each}
            </div>
        </div>
    {/if}
</targets>
