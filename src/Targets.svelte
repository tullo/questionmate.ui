<script>
    export let targets = null;
</script>

<style>
    h4 {
        text-decoration: underline;
    }
</style>

<targets class="content">
    {#if targets !== null}
        {#each targets as t}
            <p>
                <strong>{t.text}:</strong> {t.score}
            </p>
        {/each}
    {/if}
</targets>
