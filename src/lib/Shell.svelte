<script lang="ts">
    import { ShellModel, Visibility } from './model';
    
    export let shell: ShellModel = new ShellModel({
        id: 0,
        title: "no title",
        summary: "no summary",
        body: "no body",
        importance: "normal"
    });
    export let visibility: Visibility = Visibility.Full
</script>

{#if visibility === Visibility.Title}
<div class="shell {shell.importance}">
    <p>Shell {shell.id}</p>
    <p>title: {shell.title}</p>
</div>
{:else if visibility === Visibility.Summary}
<div class="shell {shell.importance}">
    <p>Shell {shell.id}</p>
    <p>title: {shell.title}</p>
    <p>summary: {shell.summary}</p>
</div>
{:else}
<div class="shell {shell.importance}">
    <p>Shell {shell.id}</p>
    <p>title: {shell.title}</p>
    <p>summary: {shell.summary}</p>
    <p>body: {shell.body}</p>
    <p>importance: {shell.importance}</p>
</div>
{/if}




<style>
    .shell {
        border: 1px solid var(--base-border-color);
        margin: var(--base-space) 0 0 0;
        padding: var(--base-space);
    }
    .low {
        background-color: white;
    }
    .normal {
        background-color: rgb(255, 249, 231);
    }
    .high {
        background-color: rgb(232, 209, 247);
    }
</style>