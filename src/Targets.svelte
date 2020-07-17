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
                {t.text}
                <progress class="progress is-primary" value="{t.score}" max="100"></progress>
            </p>
        {/each}
    {/if}
</targets>
