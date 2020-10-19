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
            {#if t.rating != null && t.rating != ""} 
            <p>
                {t.rating}                
            </p>
            {/if}
        {/each}
    {/if}
</targets>
