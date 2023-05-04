<script lang="ts">
    import Shell from "../lib/Shell.svelte";
    import { ShellModel, Visibility } from "../lib/model";
    import shells from "../lib/shell_data";
    import { randInt } from "../lib/utility";
    
    let shellToTrain: ShellModel[] = [];
    let shellThisRound: ShellModel[] = [];
    let reviewedShells: ShellModel[] = []; 
    
    // Trainer settings
    const maxShellDropPerRound = 5;
    const minShellDropPerRound = 1;
    const highImportanceRatio = 0.5;
    
    let trainerStage:
        "start" | "drill" | "end"
        = "start";
    
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
            shellToTrain = [...shells]; // not sure if it works
            console.log("toTrainShells:", shellToTrain); // debug
            trainerStage = "drill";
        }
        else if (trainerStage === "drill") {
            
            // There is shell to train
            if (shellToTrain.length !== 0) {
                
                // shell to display
                // Algorithm !!!
                shellThisRound = (() => {
                    
                    const shellCount: number = (() => {
                        
                        // adjust min and max regarding the shell left to train
                        let thisRoundMaxShellDrop: number = maxShellDropPerRound;
                        let thisRoundMinShellDrop: number = minShellDropPerRound;
                        if (maxShellDropPerRound >= shellToTrain.length) {
                            thisRoundMaxShellDrop = shellToTrain.length;
                        }
                        if (minShellDropPerRound >= shellToTrain.length) {
                            thisRoundMinShellDrop = shellToTrain.length;
                        }

                        // get the count between min and max
                        return randInt(thisRoundMinShellDrop, thisRoundMaxShellDrop);

                    })();

                    const selectedShells: ShellModel[] = (() => {
                        
                        let importanceDice: number;
                        let randomDice: number;
                        let chooseHigh: boolean;
                        
                        let importanceShells: ShellModel[];
                        let theShell: ShellModel;
                        let resultShells: ShellModel[] = [];

                        // pick for the number of shellCount
                        for (let i = 0; i < shellCount; i++) {

                            // pick by importance
                            importanceDice = Math.random();
                            chooseHigh = importanceDice <= highImportanceRatio;

                            // importance is high
                            if (chooseHigh) {
                                importanceShells = shellToTrain.filter(shell => shell.importance === "high");
                            }
                            // inportance is anything else
                            else {
                                importanceShells = shellToTrain.filter(shell => shell.importance !== "high");
                            }

                            // pick random shell in importanceShells
                            theShell = importanceShells[randInt(0, importanceShells.length - 1)];

                            // add theShell to the resultShell
                            resultShells.push(theShell);
                            
                            // remove theShell from shellToTrain
                            let shellToRemoveIndex: number = shellToTrain.findIndex(shell => shell.id === theShell.id);
                            shellToTrain.splice(shellToRemoveIndex, 1);
                        }

                        return resultShells;

                    })();


                    let result: ShellModel[] = selectedShells;  // debug
                    return result;  // debug
                })();

            }
            
            // no more shell to train
            else {
                console.log("toTrainShells is empty", shellToTrain.length);
                trainerStage = "end";
            }
            
            
            trainerStage = "end";  // debug
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
            <!-- <Shell shell={myShell} visibility={Visibility.Summary}/>
            <Shell />
            <Shell />
            <Shell />
            <Shell /> -->

                {#each shellThisRound as shell}
                    <Shell shell={shell} />
                {/each}

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