<script lang="ts">
    let audioplayer=$state(null);
    let playing=$state(false);
    let {mp3} = $props();
    const togglePlay=()=>{
        if (!audioplayer) return;
        if (audioplayer.paused) audioplayer.play();
        else audioplayer.pause();
        playing=!audioplayer.paused;
        
    }
</script>

<audio bind:this={audioplayer}>
    <source src={mp3+'.mp3'}/>
</audio>
{#if audioplayer}
    <span aria-hidden="true"  onclick={()=>togglePlay()}>{playing?'Stop':'Play'}</span>
{/if}


