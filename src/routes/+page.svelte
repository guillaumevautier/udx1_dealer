<script lang="ts">
    import Shell from "../lib/Shell.svelte";
    import { ShellModel, Visibility } from "../lib/model";

    let myShell: ShellModel = new ShellModel({
        id: 0,
        title: "boo",
        summary: "all the boo",
        body: "once upon a time, some boo...",
        importance: "high"
    });

</script>
<div>

</div>
<div class="root-wrapper">
    <div class="root-column"></div>
    <div class="root-column">
        <div>UDX1 Dealer 1.0.0</div>
        <div>TRAINER</div>
        <Shell shell={myShell} visibility={Visibility.Summary}/>
        <Shell />
        <Shell />
    </div>
    <div class="root-column">
        <div>COMMANDER</div>
    </div>
    <div class="root-column"></div>
</div>

<style>
    :global(:root) {
        --base-space: 6px;
        --base-border-color: rgb(235, 235, 235);
    }
    :global(*) {
        font-family: "consolas", monospace;
        font-size: 14px;
        margin: 0;
        padding: 0;
        text-decoration: none;
    }
    .root-wrapper {
        margin: 12px;
        gap: 12px;
        display: grid;
        grid-template-columns: auto 360px 120px auto;
        height: calc(100vh - (var(--base-space) * 4)); /* the calc is only to remove the maring */
    }
    .root-column {
        padding: var(--base-space);
        overflow: auto;
        border: solid 1px var(--base-border-color);
    }
    .root-column:first-child, .root-column:last-child {
        border: none;
    }
</style>