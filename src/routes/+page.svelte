<script lang="ts">
    import Shell from "../lib/Shell.svelte";
    import { ShellModel, Visibility } from "../lib/model";

    let trainerStage:
        "start" | "drill" | "end"
        = "end";
    
    $: nextButtonLabel = (() => {
        if (trainerStage === "start") return "start a training";
        else if (trainerStage === "drill") return "next shell batch";
        else if (trainerStage === "end") return "restart";
    })();

    
        let myShell: ShellModel = new ShellModel({
        id: 0,
        title: "boo",
        summary: "all the boo",
        body: "once upon a time, some boo...",
        importance: "high"
    });

    const next = () => {
        if (trainerStage === "start") {
            trainerStage = "drill";
        }
        else if (trainerStage === "drill") {
            trainerStage = "end";
        }
        else if (trainerStage === "end") {
            trainerStage = "start";
        }
    };

</script>
<div>

</div>
<div class="root-wrapper">
    <div class="root-column"></div>
    <div class="root-column">
        <div>UDX1 Dealer 1.0.0</div>
        <div>TRAINER</div>
        {#if trainerStage === "start"}
            <br>
            <p>click start to start a training session</p>
        {:else if trainerStage === "drill"}
            <Shell shell={myShell} visibility={Visibility.Summary}/>
            <Shell />
            <Shell />
        {:else if trainerStage === "end"}
            <br>
            <p>the end!</p>
            <p>click start to restart a training session</p>
        {/if}
    </div>
    <div class="root-column">
        <div>COMMANDER</div>
        <br>
        <button on:click={next}>{nextButtonLabel}</button>
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
    button {
        text-align: center;
        width: 100%;
    }
</style>